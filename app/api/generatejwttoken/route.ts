import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
  try {

    const secret = process.env.APP_SECRET;

    if(!secret){
      return NextResponse.json(
          {message:'APP_SECRET is not defined'},
          {status:400}
      )
    }
  
    const token = jwt.sign(
      {
        sub: "user-123",
        allowedDocumentNames: ["post-abc123"],
      },
      secret,
      {
        issuer: 'editorcolab',
        expiresIn: '1d',
      }
    );
  
    if(!token){
      return NextResponse.json(
          {message:'Failed to generate token'},
          {status:400}
      )
    }
  
    return NextResponse.json(
      {message:'Token generated',token:token},
      {status:200}
    )
  } catch (error) {
    console.error(`token generation failed: ${error}`)
    return NextResponse.json(
      {message:`token generation failed: ${error}`},
      {status:500}
    )
  }
}
