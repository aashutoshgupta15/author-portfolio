-- Run this in your Supabase SQL Editor to set up the storage bucket and permissions

-- 1. Create the 'media' bucket if it doesn't exist, and make it public
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;


-- 3. Policy to allow public read access to the 'media' bucket
create policy "Public Access to Media"
on storage.objects for select
to public
using ( bucket_id = 'media' );

-- 4. Policy to allow authenticated users to upload files to the 'media' bucket
create policy "Authenticated users can upload media"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'media' );

-- 5. Policy to allow authenticated users to update their own media (optional but good)
create policy "Authenticated users can update media"
on storage.objects for update
to authenticated
using ( bucket_id = 'media' );

-- 6. Policy to allow authenticated users to delete media
create policy "Authenticated users can delete media"
on storage.objects for delete
to authenticated
using ( bucket_id = 'media' );
