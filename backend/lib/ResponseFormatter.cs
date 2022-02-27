namespace backend.lib;

public class ResponseFormatter {
    public static Dictionary<String, Object> buildSuccess(Object o) {
        Dictionary<String, Object> response = new Dictionary<String, Object>();
        response.Add("status", 0);
        response.Add("data", o);
        return response;
    }

    public static Dictionary<String, Object> buildError(Object message) {
        Dictionary<String, Object> response = new Dictionary<String, Object>();
        response.Add("status", 1);
        response.Add("data", message);
        return response;
    }
}