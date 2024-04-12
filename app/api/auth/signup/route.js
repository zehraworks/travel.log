import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateAuthToken , setAuthCookies} from "@/lib/serverHelpers";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, email, password} = await request.json();

    if (!email || !password) {
      return NextResponse.json({success:false, 
        error: "Both email and password are required.",
      });
    }
    
    const existingUser= await prisma.user.findUnique({where:{email:email}});

    if(existingUser){
      return NextResponse.json({success:false , error:"User already existed" , existingUser}, {status:409})
    } 
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data:{
          email,
          password: hashedPassword,
          name,
      }
    });
    
    const authToken=generateAuthToken(newUser._id)
    setAuthCookies(authToken);

    return NextResponse.json({success:true, message: "User created successfully",newUser}, {status:200});

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false,
      error: "An error occurred while creating the user.",
    },{status:500});
  } finally {
    await prisma.$disconnect();
  }
}
