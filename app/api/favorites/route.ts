import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Get all favorites for the current user
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) 
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { data, error } = await supabase
    .from('favorites')
    .select('nade_id')
    .eq('user_id', user.id);

  if (error) 
    return NextResponse.json({ error: error.message }, { status: 500 });

  const favoriteIds = data?.map((fav) => fav.nade_id) || []
  return NextResponse.json({ favorites: favoriteIds })
}

// POST - Add a favorite
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) 
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { nade_id } = await request.json()

  if (!nade_id) {
    return NextResponse.json({ error: 'nade_id is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: user.id, nade_id })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ success: true, favorite: { nade_id } })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true, favorite: data })
}

// DELETE - Remove a favorite
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) 
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const nade_id = searchParams.get('nade_id');

  if (!nade_id) {
    return NextResponse.json({ error: 'nade_id is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('nade_id', nade_id);

  if (error) 
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
