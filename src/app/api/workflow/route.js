import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const workflowFile = searchParams.get('file');
    
    if (!workflowFile) {
      return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
    }

    // Security: Only allow files from the examples directory
    const allowedFiles = [
      'sample-workflow.json',
      'sample-embed-flow.json', 
      'sample-openapi.json'
    ];

    if (!allowedFiles.includes(workflowFile)) {
      return NextResponse.json({ error: 'File not found or not allowed' }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'public', 'examples', workflowFile);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const workflowData = JSON.parse(fileContent);

    return NextResponse.json({
      success: true,
      data: workflowData,
      filename: workflowFile,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error loading workflow:', error);
    return NextResponse.json(
      { error: 'Failed to load workflow data', details: error.message }, 
      { status: 500 }
    );
  }
}

// Optional: Support POST for custom workflow data
export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.workflow) {
      return NextResponse.json({ error: 'Workflow data is required' }, { status: 400 });
    }

    // Validate basic workflow structure
    if (!body.workflow.nodes || !Array.isArray(body.workflow.nodes)) {
      return NextResponse.json({ error: 'Invalid workflow format: nodes array is required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: body.workflow,
      timestamp: new Date().toISOString(),
      message: 'Custom workflow validated successfully'
    });

  } catch (error) {
    console.error('Error processing custom workflow:', error);
    return NextResponse.json(
      { error: 'Failed to process workflow data', details: error.message }, 
      { status: 500 }
    );
  }
}
