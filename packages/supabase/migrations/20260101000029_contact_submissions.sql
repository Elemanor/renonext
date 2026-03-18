-- Contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Allow anonymous inserts (public contact form)
alter table public.contact_submissions enable row level security;

create policy "Anyone can submit a contact form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Only service role (admin) can read submissions
create policy "Only admins can read submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
