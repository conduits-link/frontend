import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { prompt, input } = await request.json();

	const result = {
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac elit vel odio sollicitudin tristique. Vivamus varius quam vel urna sagittis varius. Fusce eget ante eget metus tempor accumsan. Proin quis lorem auctor, vulputate ex non, aliquam orci. Integer ut neque nec purus cursus fermentum in eget urna. Praesent quis aliquam justo. Nullam vel nunc vel nulla bibendum tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean posuere, felis in fringilla tempus, odio justo cursus risus, nec scelerisque neque velit ut justo. Suspendisse potenti. Sed varius tortor ut tristique dignissim. Cras interdum enim in erat volutpat, eget fringilla mauris luctus.",
	};

	return NextResponse.json(result);
}
