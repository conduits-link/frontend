export async function PUT(req: Request, { params }: { params: { uid: string } }) {
   const data = await req.json();
   const prompt = {
      uid: params.uid,
      ...data
   };
   console.log("updated prompt: ", prompt);
   return new Response(null, { status: 200 });
}

