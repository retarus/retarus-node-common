import { rest } from 'msw';

export const handlers = [
    rest.get("http://example.com/rest/v1/get/test1", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                { message: "got all that stuff" }
            )
        )
    }),
    rest.delete("http://example.com/rest/v1/delete/test", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                { message: "deleted stuff" }
            )
        )
    }),
    rest.delete("http://example.abc.com/rest/v1/delete/test", (req, res, ctx) => {
        return res(
            ctx.status(404),
            ctx.json(
                { message: "Not Found" }
            )
        )
    }),
    rest.post("http://example.com/rest/v1/post/test1", async (req, res, ctx)  => {
        let data = await req.json();
        console.log("server: " + data);
        if (data !== undefined) {
            if (data["request"] === "hallo_welt_test123") {
                return res(
                    ctx.status(200));
            }
        }
        return res(
            ctx.status(400)
        );
    })
]
