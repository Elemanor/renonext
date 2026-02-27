import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { fmtRelativeTime } from '@renonext/shared/utils/formatters';
import { MOCK_DASHBOARD } from '@/lib/mock/dashboard';
import { MiniSparkline } from '@/components/charts/mini-sparkline';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { WeeklySchedulePanel } from '@/components/weekly-schedule';
import { CrewOnSitePanel } from '@/components/crew-on-site';
import { motion } from 'framer-motion';
import { SlideToAct } from '@/components/slide-to-act';
import {
  Users,
  ShieldCheck,
  CalendarCheck,
  AlertCircle,
  UserCheck,
  FileQuestion,
  ClipboardList,
  Camera,
  Truck,
  TrendingUp,
  TrendingDown,
  CloudSun,
  MapPin,
  ChevronRight,
  ArrowRight,
  Droplets,
  Wind,
  LogIn,
  Package,
  Zap,
  Clock,
  ClipboardCheck,
  ArrowUpFromLine,
  Forklift,
  Shield,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  UserCheck, FileQuestion, ShieldCheck, ClipboardList,
  Camera, Truck, AlertCircle,
};

const DELIVERY_ICON: Record<string, React.ElementType> = {
  Truck, Package, Zap,
};

const DELIVERY_STATUS_STYLE: Record<string, string> = {
  'in-transit': 'bg-blue-100 text-blue-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-slate-100 text-slate-600',
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// Stagger animation container
const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export function DashboardPage() {
  const { user, membership } = useAuth();
  const navigate = useNavigate();
  const demo = isDemoMode();
  const d = demo ? MOCK_DASHBOARD : MOCK_DASHBOARD;

  const displayName = useMemo(() => {
    if (membership?.display_name) return membership.display_name;
    if (user?.email) {
      const name = user.email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return 'there';
  }, [user?.email, membership?.display_name]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="lg:flex lg:gap-6">
      {/* ── Main content ── */}
      <div className="min-w-0 flex-1 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {getGreeting()}, {displayName}
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">{today}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {membership?.role && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 capitalize">
                  {membership.role}
                </span>
              )}
              {d.project && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" />
                  {d.project.name}
                </span>
              )}
            </div>
          </div>
          {/* Desktop weather pill */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
            <CloudSun className="h-3.5 w-3.5" />
            {d.weather.temp}°C {d.weather.condition}
          </div>
        </div>

        {/* Mobile Weather Card */}
        <div className="md:hidden rounded-2xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-4xl font-bold">{d.weather.temp}°C</p>
              <p className="mt-1 text-sm text-white/80">{d.weather.condition}</p>
            </div>
            <CloudSun className="h-10 w-10 text-white/60" />
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Wind className="h-3.5 w-3.5" />
              {d.weather.wind}
            </span>
            <span className="flex items-center gap-1">
              <Droplets className="h-3.5 w-3.5" />
              {d.weather.humidity}%
            </span>
          </div>
          {d.project && (
            <p className="mt-2 text-xs text-white/70">
              <MapPin className="mr-1 inline h-3 w-3" />
              {d.project.name}
            </p>
          )}
        </div>

        {/* Mobile Sign-In Status Card */}
        <div className="md:hidden rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
              <LogIn className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Not Checked In</p>
              <p className="text-sm text-slate-500">Ready to start your shift?</p>
            </div>
          </div>
          <SlideToAct 
            label="Slide to Check In" 
            successLabel="Checked In"
            onComplete={() => {
              // In a real app, this would trigger an API call
              setTimeout(() => navigate('/attendance'), 800);
            }} 
          />
        </div>

        {/* Alert callout */}
        {d.alerts.map((alert, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="flex-1">{alert.message}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-amber-400" />
          </div>
        ))}

        {/* 4 Stat Cards — hover-to-gradient on desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          <HoverStatCard
            icon={Users}
            gradient="from-blue-500 to-blue-600"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            label="Workers On Site"
            value={String(d.stats.workersOnSite.value)}
            sparkline={d.stats.workersOnSite.trend}
            sparkColor={CHART_COLORS.primary}
          />
          <HoverStatCard
            icon={ShieldCheck}
            gradient="from-emerald-500 to-emerald-600"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            label="Safety Score"
            value={`${d.stats.safetyScore.value}%`}
            sparkline={d.stats.safetyScore.trend}
            sparkColor={CHART_COLORS.success}
          />
          <HoverStatCard
            icon={CalendarCheck}
            gradient="from-emerald-500 to-teal-600"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            label="Schedule Status"
            value={d.stats.scheduleStatus.label}
            subtitle={d.stats.scheduleStatus.detail}
          />
          <HoverStatCard
            icon={AlertCircle}
            gradient="from-amber-500 to-orange-500"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            label="Open Items"
            value={String(d.stats.openItems.value)}
            subtitle={d.stats.openItems.breakdown}
          />
        </motion.div>

        {/* ── Weekly Schedule ── */}
        <WeeklySchedulePanel
          days={d.weeklySchedule}
          onViewAll={() => navigate('/schedule')}
        />

        {/* ── Safety Forms ── */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Safety Forms</h2>
            <button
              onClick={() => navigate('/safety-forms')}
              className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
            {([
              { label: 'JSA Generator', desc: 'Job Safety Analysis', href: '/safety-forms/new', icon: ClipboardCheck, color: 'bg-blue-50', iconColor: 'text-blue-600', frequent: true },
              { label: 'Toolbox Meeting', desc: 'Weekly safety talk', href: '/safety-forms/toolbox-meeting', icon: Users, color: 'bg-emerald-50', iconColor: 'text-emerald-600', frequent: true },
              { label: 'Scissor Lift', desc: 'Pre-use inspection', href: '/safety-forms/scissor-lift', icon: ArrowUpFromLine, color: 'bg-amber-50', iconColor: 'text-amber-600' },
              { label: 'Forklift', desc: 'Pre-shift inspection', href: '/safety-forms/forklift', icon: Forklift, color: 'bg-purple-50', iconColor: 'text-purple-600' },
              { label: 'Fall Protection', desc: 'OSHA requirements', href: '/safety-forms/fall-protection', icon: Shield, color: 'bg-red-50', iconColor: 'text-red-600' },
            ] as const).map((form) => {
              const Icon = form.icon;
              return (
                <motion.button
                  key={form.href}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate(form.href)}
                  className="group relative flex items-center gap-3 rounded-xl border bg-white p-3 text-left transition-all duration-200 hover:shadow-md hover:border-blue-200"
                >
                  {form.frequent && (
                    <div className="absolute -right-1 -top-1 z-10 rounded-full bg-blue-600 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm transition-transform group-hover:scale-110">
                      Frequent
                    </div>
                  )}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${form.color}`}>
                    <Icon className={`h-5 w-5 ${form.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{form.label}</p>
                    <p className="text-[11px] text-slate-500">{form.desc}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mobile: Crew On Site + Deliveries (inline) */}
        <div className="lg:hidden space-y-5">
          <CrewOnSitePanel
            crew={d.crewOnSite}
            onViewAll={() => navigate('/attendance')}
          />
          <DeliveriesPanel deliveries={d.upcomingDeliveries} onViewAll={() => navigate('/materials')} />
        </div>

        {/* Quick Actions — large touch targets */}
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-900">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {d.quickActions.map((action) => {
              const Icon = ICON_MAP[action.icon] ?? ClipboardList;
              const href: Record<string, string> = {
                checkin: '/attendance',
                rfi: '/rfis',
                safety: '/safety-forms',
                activity: '/work-areas',
              };
              return (
                <motion.button
                  key={action.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(href[action.id] ?? '/')}
                  className="flex min-h-[100px] md:min-h-[80px] flex-col items-center justify-center gap-2 rounded-2xl border bg-white p-4 text-center transition-all duration-200 hover:shadow-sm"
                >
                  <div className="flex h-12 w-12 md:h-10 md:w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="h-7 w-7 md:h-5 md:w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Recent Activity</h2>
            <span className="text-xs text-slate-400">Last 24 hours</span>
          </div>
          <div className="space-y-1">
            {d.recentActivity.map((item, index) => {
              const Icon = ICON_MAP[item.icon] ?? ClipboardList;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
                  className="flex items-start gap-3 rounded-lg p-2 transition-all duration-200 hover:bg-slate-50"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Icon className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-700">{item.description}</p>
                    <p className="text-xs text-slate-400">{fmtRelativeTime(item.time)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Desktop: Right sidebar (sticky) ── */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-4 space-y-4">
          <CrewOnSitePanel
            crew={d.crewOnSite}
            onViewAll={() => navigate('/attendance')}
          />
          <DeliveriesPanel deliveries={d.upcomingDeliveries} onViewAll={() => navigate('/materials')} />
        </div>
      </aside>
    </div>
  );
}

/* ---------- HoverStatCard — gradient overlay on hover ---------- */

interface HoverStatCardProps {
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  subtitle?: string;
  sparkline?: number[];
  sparkColor?: string;
}

function HoverStatCard({
  icon: Icon,
  gradient,
  iconBg,
  iconColor,
  label,
  value,
  subtitle,
  sparkline,
  sparkColor,
}: HoverStatCardProps) {
  const trend = useMemo(() => {
    if (!sparkline || sparkline.length < 2) return null;
    const last = sparkline[sparkline.length - 1];
    const prev = sparkline[sparkline.length - 2];
    return last >= prev ? 'up' : 'down';
  }, [sparkline]);

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative overflow-hidden rounded-xl border bg-white p-3 transition-all duration-300"
    >
      {/* Gradient overlay — visible on hover (desktop) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      {/* Content — z-10 to stay above overlay */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 ${iconBg} group-hover:bg-white/20`}
          >
            <Icon
              className={`h-4 w-4 transition-colors duration-300 ${iconColor} group-hover:text-white`}
            />
          </div>
          {sparkline && (
            <div className="transition-opacity duration-300 group-hover:opacity-70">
              <MiniSparkline data={sparkline} color={sparkColor} />
            </div>
          )}
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <p className="text-xl font-bold tabular-nums text-slate-900 transition-colors duration-300 group-hover:text-white">
            {value}
          </p>
          {trend && (
            trend === 'up' ? (
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500 transition-colors duration-300 group-hover:text-white/80" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-500 transition-colors duration-300 group-hover:text-white/80" />
            )
          )}
        </div>
        <p className="text-xs text-slate-500 transition-colors duration-300 group-hover:text-white/90">
          {label}
        </p>
        {subtitle && (
          <p className="text-[10px] text-slate-400 transition-colors duration-300 group-hover:text-white/70">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ---------- DeliveriesPanel — sidebar-friendly ---------- */

interface Delivery {
  id: string;
  item: string;
  qty: string;
  supplier: string;
  eta: string;
  status: 'in-transit' | 'confirmed' | 'pending';
  icon: string;
}

function DeliveriesPanel({ deliveries, onViewAll }: { deliveries: Delivery[]; onViewAll: () => void }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
            <Truck className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">Deliveries</h3>
        </div>
        <span className="flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 tabular-nums">
          {deliveries.length}
        </span>
      </div>

      <div className="max-h-[360px] overflow-y-auto px-2 scrollbar-hide">
        {deliveries.map((del, i) => {
          const Icon = DELIVERY_ICON[del.icon] ?? Package;
          return (
            <motion.div
              key={del.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              className="flex items-start gap-2.5 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
            >
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                del.status === 'in-transit' ? 'bg-blue-50' : 'bg-slate-50'
              }`}>
                <Icon className={`h-4 w-4 ${
                  del.status === 'in-transit' ? 'text-blue-600' : 'text-slate-400'
                }`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-slate-900">{del.item}</p>
                <p className="text-[11px] text-slate-500">{del.qty}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-px text-[9px] font-semibold ${DELIVERY_STATUS_STYLE[del.status]}`}>
                    {del.status === 'in-transit' && <Clock className="h-2 w-2" />}
                    {del.status === 'in-transit' ? 'In Transit' : del.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                  <span className="text-[10px] tabular-nums text-slate-400">{del.eta}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="border-t px-4 py-3">
        <button
          onClick={onViewAll}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-slate-100 hover:text-blue-700"
        >
          All Materials <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
