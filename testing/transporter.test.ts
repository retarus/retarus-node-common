import Configuration from "../src/config";
import { Region, RegionUri } from "../src/region";
import Transporter from "../src/transporter";
import { server } from "./mocks/server"


describe("test transporter methods", () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())
    test("get request", async () => {
        let uri = new RegionUri(Region.Europe, "", ["http://example.com"]);
        Configuration.getInstance().setRegion(Region.Europe);
        Configuration.getInstance().setAuth("John", "Doe");
        let tp = new Transporter([uri]);
        let path = "/get/test1";
        let res = await tp.get(path, {});
        console.log(res);
        expect(res.error).toBe(false);
    })
    test("Post request", async () => {
        let uri = new RegionUri(Region.Europe, "http://example.com", [""]);
        Configuration.getInstance().setRegion(Region.Europe);
        Configuration.getInstance().setAuth("John", "Doe");
        let tp = new Transporter([uri]);
        let path = "/post/test1";
        let res = await tp.post(path, {request: "hallo_welt_test123"}, {});
        console.log(res);
        expect(res.error).toBe(false);
    })
    test("Delete request", async () => {
        let uri = new RegionUri(Region.Europe, "", ["http://example.com"]);
        Configuration.getInstance().setRegion(Region.Europe);
        Configuration.getInstance().setAuth("John", "Doe");
        let tp = new Transporter([uri])
        let path = "/delete/test"
        let res = await tp.delete(path);
        console.log(res);
        expect(res.error).toBe(false);
    })
    test("data_center function in get", async () => {
        let uri = new RegionUri(Region.Europe, "", ["http://example.com", "http://example.abc.com"]);
        Configuration.getInstance().setRegion(Region.Europe);
        Configuration.getInstance().setAuth("John", "Doe");
        let tp = new Transporter([uri]);
        let path = "/delete/test";
        let res = await tp.delete(path);
        console.log(res);
        expect(res.error).toBe(false);
    })
})