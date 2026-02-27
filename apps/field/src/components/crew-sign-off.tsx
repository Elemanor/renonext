import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Plus, Users, Play } from 'lucide-react';
import { SignatureCanvas } from '@/components/signature-canvas';

export interface CrewMember {
  id: string;
  name: string;
  trade: string;
  signed: boolean;
  signatureUrl?: string;
}

interface CrewSignOffProps {
  crewMembers: CrewMember[];
  onSign: (memberId: string, signatureUrl: string) => void;
  onAddMember: (name: string, trade: string) => void;
  onRemoveMember: (memberId: string) => void;
}

export function CrewSignOff({
  crewMembers,
  onSign,
  onAddMember,
  onRemoveMember,
}: CrewSignOffProps) {
  const [batchMode, setBatchMode] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newTrade, setNewTrade] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Get unsigned members for batch mode
  const unsignedMembers = crewMembers.filter((m) => !m.signed);
  const signedCount = crewMembers.length - unsignedMembers.length;

  // Current member in batch mode
  const currentMember = batchMode ? unsignedMembers[currentBatchIndex] : null;

  function handleAddMember() {
    if (!newName.trim() || !newTrade.trim()) return;
    onAddMember(newName.trim(), newTrade.trim());
    setNewName('');
    setNewTrade('');
    nameInputRef.current?.focus();
  }

  function handleIndividualSign(memberId: string) {
    setSelectedMemberId(memberId);
    setShowSignatureModal(true);
  }

  function handleSignatureSave(dataUrl: string) {
    if (batchMode && currentMember) {
      // Batch mode: sign current member and move to next
      onSign(currentMember.id, dataUrl);
      setShowSignatureModal(false);

      // Move to next unsigned member
      const nextIndex = currentBatchIndex;
      if (nextIndex >= unsignedMembers.length - 1) {
        // All done
        setBatchMode(false);
        setCurrentBatchIndex(0);
      } else {
        setCurrentBatchIndex(nextIndex + 1);
        // Auto-open signature for next person after short delay
        setTimeout(() => setShowSignatureModal(true), 300);
      }
    } else if (selectedMemberId) {
      // Individual mode
      onSign(selectedMemberId, dataUrl);
      setShowSignatureModal(false);
      setSelectedMemberId(null);
    }
  }

  function handleSkipCurrent() {
    if (!batchMode || !currentMember) return;
    const nextIndex = currentBatchIndex + 1;
    if (nextIndex >= unsignedMembers.length) {
      // End of list
      setBatchMode(false);
      setCurrentBatchIndex(0);
    } else {
      setCurrentBatchIndex(nextIndex);
    }
  }

  function startBatchMode() {
    if (unsignedMembers.length === 0) return;
    setBatchMode(true);
    setCurrentBatchIndex(0);
    // Auto-open signature for first person
    setTimeout(() => setShowSignatureModal(true), 300);
  }

  function exitBatchMode() {
    setBatchMode(false);
    setCurrentBatchIndex(0);
    setShowSignatureModal(false);
  }

  const selectedMember = selectedMemberId
    ? crewMembers.find((m) => m.id === selectedMemberId)
    : currentMember;

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-slate-600" />
          <h2 className="text-sm font-semibold text-slate-900">
            Crew Sign-Off
          </h2>
          <span className="text-xs text-slate-400">
            ({signedCount} of {crewMembers.length} signed)
          </span>
        </div>
        {unsignedMembers.length > 0 && !batchMode && (
          <button
            onClick={startBatchMode}
            className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
          >
            <Play className="h-3.5 w-3.5" />
            Start Batch Sign
          </button>
        )}
      </div>

      {/* Crew List */}
      {!batchMode && (
        <div className="mt-3 space-y-2">
          {crewMembers.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`flex min-h-[48px] items-center justify-between rounded-lg border px-3 py-2 ${
                member.signed ? 'bg-green-50 border-green-200' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {member.signed ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-slate-300" />
                )}
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {member.name}
                  </p>
                  <p className="text-xs text-slate-500">{member.trade}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {member.signed ? (
                  <span className="text-xs text-green-600">Signed</span>
                ) : (
                  <>
                    <button
                      onClick={() => handleIndividualSign(member.id)}
                      className="rounded-md border border-blue-600 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                    >
                      Sign
                    </button>
                    <button
                      onClick={() => onRemoveMember(member.id)}
                      className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Member Form */}
      {!batchMode && (
        <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500">
                Name
              </label>
              <input
                ref={nameInputRef}
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && newTrade && handleAddMember()
                }
                placeholder="John Doe"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500">
                Trade
              </label>
              <input
                type="text"
                value={newTrade}
                onChange={(e) => setNewTrade(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && newName && handleAddMember()}
                placeholder="Electrician"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddMember}
              disabled={!newName.trim() || !newTrade.trim()}
              className="flex items-center gap-1.5 rounded-md bg-slate-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>
      )}

      {/* Batch Mode Overlay */}
      <AnimatePresence>
        {batchMode && currentMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm"
          >
            <div className="w-full max-w-md p-4">
              <div className="rounded-lg bg-white p-6">
                <div className="text-center">
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Batch Sign Mode
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {currentBatchIndex + 1} of {unsignedMembers.length}
                    </p>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {currentMember.name}
                  </h3>
                  <p className="mt-1 text-lg text-slate-600">
                    {currentMember.trade}
                  </p>
                </div>

                {showSignatureModal ? (
                  <div className="mt-6">
                    <SignatureCanvas
                      title={`${currentMember.name} — Sign below`}
                      onSave={handleSignatureSave}
                      onCancel={() => setShowSignatureModal(false)}
                    />
                  </div>
                ) : (
                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={handleSkipCurrent}
                      className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Skip
                    </button>
                    <button
                      onClick={() => setShowSignatureModal(true)}
                      className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Sign
                    </button>
                  </div>
                )}

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={exitBatchMode}
                    className="text-xs text-slate-400 hover:text-slate-600 hover:underline"
                  >
                    Exit Batch Mode
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Individual Signature Modal */}
      <AnimatePresence>
        {showSignatureModal && !batchMode && selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md"
            >
              <div className="rounded-lg bg-white p-4">
                <div className="mb-3 text-center">
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {selectedMember.trade}
                  </p>
                </div>
                <SignatureCanvas
                  title={`${selectedMember.name} — Sign below`}
                  onSave={handleSignatureSave}
                  onCancel={() => {
                    setShowSignatureModal(false);
                    setSelectedMemberId(null);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
