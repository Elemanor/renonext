/**
 * Critical Path Method (CPM) Algorithm Implementation
 *
 * Ported from JSA app (jsa-app/src/utils/criticalPath.ts).
 * Calculates the critical path for a set of tasks with dependencies.
 * The critical path is the longest sequence of dependent tasks that determines
 * the minimum project duration.
 */

export interface CPMTask {
  id: string;
  task_type: string;
  start_date?: string;
  end_date?: string;
  duration_days?: number;
  status: string;
  predecessors?: string[];
  successors?: string[];
}

export interface ScheduledTask extends CPMTask {
  duration: number;
  es: number; // Early Start
  ef: number; // Early Finish
  ls: number; // Late Start
  lf: number; // Late Finish
  slack: number;
  isCritical: boolean;
}

export interface CriticalPathResult {
  criticalPath: ScheduledTask[];
  allTasks: ScheduledTask[];
  projectDuration: number;
  startDate: Date;
  endDate: Date;
}

export interface CPMDependencyLink {
  id: string;
  predecessor_task_id: string;
  successor_task_id: string;
  dependency_type:
    | 'finish_to_start'
    | 'start_to_start'
    | 'finish_to_finish'
    | 'start_to_finish';
  lag_days: number;
}

export type DelayStatus = 'on_time' | 'at_risk' | 'delayed' | 'ahead';

/**
 * Calculates the critical path for a set of tasks.
 * Uses forward pass (ES/EF) and backward pass (LS/LF) to determine
 * slack and identify critical tasks (slack === 0).
 */
export function calculateCriticalPath(
  tasks: CPMTask[],
  dependencies: CPMDependencyLink[] = []
): CriticalPathResult {
  // Build dependency maps from explicit dependencies
  const predecessorMap = new Map<string, string[]>();
  const successorMap = new Map<string, string[]>();

  dependencies.forEach((dep) => {
    if (!predecessorMap.has(dep.successor_task_id)) {
      predecessorMap.set(dep.successor_task_id, []);
    }
    predecessorMap.get(dep.successor_task_id)!.push(dep.predecessor_task_id);

    if (!successorMap.has(dep.predecessor_task_id)) {
      successorMap.set(dep.predecessor_task_id, []);
    }
    successorMap.get(dep.predecessor_task_id)!.push(dep.successor_task_id);
  });

  // Initialize scheduled tasks
  const scheduledTasks: Map<string, ScheduledTask> = new Map();

  tasks.forEach((task) => {
    const duration = task.duration_days || 1;
    const predecessors =
      predecessorMap.get(task.id) || task.predecessors || [];

    scheduledTasks.set(task.id, {
      ...task,
      duration,
      predecessors,
      successors: successorMap.get(task.id) || task.successors || [],
      es: 0,
      ef: 0,
      ls: Infinity,
      lf: Infinity,
      slack: 0,
      isCritical: false,
    });
  });

  // Forward pass — calculate Early Start (ES) and Early Finish (EF)
  const processedForward = new Set<string>();

  const processForward = (taskId: string): void => {
    if (processedForward.has(taskId)) return;

    const task = scheduledTasks.get(taskId);
    if (!task) return;

    const predecessors = task.predecessors || [];
    if (predecessors.length > 0) {
      predecessors.forEach((predId) => {
        if (predId && !processedForward.has(predId)) {
          processForward(predId);
        }
      });

      // ES = max(EF of all predecessors)
      task.es = Math.max(
        ...predecessors
          .filter((predId) => scheduledTasks.has(predId))
          .map((predId) => scheduledTasks.get(predId)!.ef),
        0
      );
    }

    task.ef = task.es + task.duration;
    processedForward.add(taskId);
  };

  scheduledTasks.forEach((_, taskId) => processForward(taskId));

  // Find project end (max EF)
  const projectDuration = Math.max(
    ...Array.from(scheduledTasks.values()).map((t) => t.ef),
    0
  );

  // Backward pass — calculate Late Start (LS) and Late Finish (LF)
  const processedBackward = new Set<string>();

  const processBackward = (taskId: string): void => {
    if (processedBackward.has(taskId)) return;

    const task = scheduledTasks.get(taskId);
    if (!task) return;

    const successors = task.successors || [];
    const successorTasks = successors
      .filter((succId) => scheduledTasks.has(succId))
      .map((succId) => scheduledTasks.get(succId)!);

    if (successorTasks.length === 0) {
      task.lf = projectDuration;
    } else {
      successorTasks.forEach((succ) => {
        if (!processedBackward.has(succ.id)) {
          processBackward(succ.id);
        }
      });

      // LF = min(LS of all successors)
      task.lf = Math.min(...successorTasks.map((s) => s.ls));
    }

    task.ls = task.lf - task.duration;
    task.slack = task.ls - task.es;
    task.isCritical = task.slack === 0;
    processedBackward.add(taskId);
  };

  scheduledTasks.forEach((_, taskId) => processBackward(taskId));

  // Build results
  const allTasks = Array.from(scheduledTasks.values());
  const criticalPath = allTasks.filter((t) => t.isCritical);

  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + projectDuration);

  return {
    criticalPath,
    allTasks,
    projectDuration,
    startDate,
    endDate,
  };
}

/**
 * Get delay status based on planned vs actual dates
 */
export function getDelayStatus(
  plannedEndDate: Date | string | undefined,
  actualEndDate: Date | string | undefined,
  status: string
): DelayStatus {
  if (!plannedEndDate) return 'on_time';

  const planned = new Date(plannedEndDate);
  const now = new Date();

  if (actualEndDate) {
    const actual = new Date(actualEndDate);
    const diff = Math.ceil(
      (actual.getTime() - planned.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff <= -2) return 'ahead';
    if (diff <= 0) return 'on_time';
    if (diff <= 2) return 'at_risk';
    return 'delayed';
  }

  if (status === 'completed') return 'on_time';

  // Task not completed — check if we're past the planned end date
  const diff = Math.ceil(
    (now.getTime() - planned.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff <= 0) return 'on_time';
  if (diff <= 2) return 'at_risk';
  return 'delayed';
}

/**
 * Get hex color for a delay status
 */
export function getDelayStatusColor(status: DelayStatus): string {
  switch (status) {
    case 'ahead':
      return '#3b82f6'; // blue
    case 'on_time':
      return '#10b981'; // green
    case 'at_risk':
      return '#f59e0b'; // amber
    case 'delayed':
      return '#ef4444'; // red
    default:
      return '#6b7280'; // gray
  }
}

/**
 * Get Tailwind badge classes for a delay status
 */
export function getDelayStatusBadgeClass(status: DelayStatus): string {
  switch (status) {
    case 'ahead':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'on_time':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'at_risk':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'delayed':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Topological sort using Kahn's algorithm.
 * Returns tasks in dependency order (predecessors before successors).
 */
export function sortByDependencyOrder(
  tasks: CPMTask[],
  dependencies: CPMDependencyLink[]
): CPMTask[] {
  const inDegree = new Map<string, number>();
  const adjacencyList = new Map<string, string[]>();

  tasks.forEach((task) => {
    inDegree.set(task.id, 0);
    adjacencyList.set(task.id, []);
  });

  dependencies.forEach((dep) => {
    const successors = adjacencyList.get(dep.predecessor_task_id);
    if (successors) {
      successors.push(dep.successor_task_id);
    }
    inDegree.set(
      dep.successor_task_id,
      (inDegree.get(dep.successor_task_id) || 0) + 1
    );
  });

  // Kahn's algorithm
  const queue: string[] = [];
  const result: CPMTask[] = [];

  inDegree.forEach((degree, taskId) => {
    if (degree === 0) {
      queue.push(taskId);
    }
  });

  while (queue.length > 0) {
    const taskId = queue.shift()!;
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      result.push(task);
    }

    const successors = adjacencyList.get(taskId) || [];
    successors.forEach((succId) => {
      const newDegree = (inDegree.get(succId) || 1) - 1;
      inDegree.set(succId, newDegree);
      if (newDegree === 0) {
        queue.push(succId);
      }
    });
  }

  // Append remaining tasks (disconnected or cyclic)
  tasks.forEach((task) => {
    if (!result.find((t) => t.id === task.id)) {
      result.push(task);
    }
  });

  return result;
}

/**
 * Check if adding a dependency would create a cycle.
 * Uses DFS with a recursion stack for detection.
 */
export function wouldCreateCycle(
  predecessorId: string,
  successorId: string,
  existingDependencies: CPMDependencyLink[]
): boolean {
  const adjacencyList = new Map<string, string[]>();

  existingDependencies.forEach((dep) => {
    if (!adjacencyList.has(dep.predecessor_task_id)) {
      adjacencyList.set(dep.predecessor_task_id, []);
    }
    adjacencyList.get(dep.predecessor_task_id)!.push(dep.successor_task_id);
  });

  // Add the proposed edge temporarily
  if (!adjacencyList.has(predecessorId)) {
    adjacencyList.set(predecessorId, []);
  }
  adjacencyList.get(predecessorId)!.push(successorId);

  // DFS cycle detection
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const hasCycle = (nodeId: string): boolean => {
    if (recursionStack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (hasCycle(neighbor)) return true;
    }

    recursionStack.delete(nodeId);
    return false;
  };

  return hasCycle(predecessorId);
}
