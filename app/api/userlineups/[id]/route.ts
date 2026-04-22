import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

interface UserLineupPayload {
  title?: string;
  map?: string;
  type?: string;
  side?: string;
  video_url?: string;
  difficulty?: string;
  description?: string;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({error: 'Unauthorized'}, { status: 401 });
  }

  const { id } = await params;
  const lineupId = Number(id);

  if (!Number.isInteger(lineupId) || lineupId <= 0) {
    return NextResponse.json({error: 'Invalid lineup id'}, { status: 400 });
  }

  const body: UserLineupPayload = await request.json();
  const { title, map, type, side, video_url, difficulty, description } = body;

  if (!title || !map || !type || !side || !video_url || !difficulty) {
    return NextResponse.json({error: 'Missing required fields'}, { status: 400 });
  }

  const { data, error } = await supabase
    .from('user_lineups')
    .update({
      title,
      map,
      type,
      side,
      video_url,
      difficulty,
      description: description || '',
    })
    .eq('id', lineupId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({error: 'Lineup not found'}, { status: 404 });
    }
    return NextResponse.json({error: error.message}, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({error: 'Lineup not found'}, { status: 404 });
  }

  return NextResponse.json({success: true, lineup: data});
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({error: 'Unauthorized'}, { status: 401 });
  }

  const { id } = await params;
  const lineupId = Number(id);

  if (!Number.isInteger(lineupId) || lineupId <= 0) {
    return NextResponse.json({error: 'Invalid lineup id'}, { status: 400 });
  }

  const { data, error } = await supabase
    .from('user_lineups')
    .delete()
    .eq('id', lineupId)
    .eq('user_id', user.id)
    .select('id')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({error: 'Lineup not found' }, {status: 404});
    }
    return NextResponse.json({error: error.message }, {status: 500});
  }

  if (!data) {
    return NextResponse.json({error: 'Lineup not found'}, {status: 404});
  }

  return NextResponse.json({success: true});
}