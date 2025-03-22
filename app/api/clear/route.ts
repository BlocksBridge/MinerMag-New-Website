import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) { 
      //console.log(getPosts[0].acf)
     revalidateTag("tags");
     revalidateTag("posts");
     revalidatePath('/', 'layout')
    return NextResponse.json({ message: "Cleared Cache" });
}