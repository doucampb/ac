import org.junit.Test;
import play.mvc.Result;
import play.test.FakeRequest;

import static org.fest.assertions.Assertions.assertThat;
import static play.test.Helpers.*;

public class ApplicationTest {

    @Test
    public void checkObfuscation() {
        running(fakeApplication(), new Runnable() {
            public void run() {
                String stockRef = "ARNCI-U-27455";
                String registration = "CA04LPK";
                String apiCall = "/api/stockReference/" + stockRef + "/registration/" + registration;
                FakeRequest fakeRequest = new FakeRequest("GET", apiCall);

                Result result = route(fakeRequest);
                String resultString = contentAsString(result);
                assertThat(resultString).isEqualTo("\"AKRPNLC4I0-AUC2\"");
            }
        });
    }

    @Test
    public void getImageLinks() {
        running(fakeApplication(), new Runnable() {
            public void run() {
                String obfuscatedStockRef = "ARNCI-U-27455";

                FakeRequest imageLinksRequest = new FakeRequest("GET", "/api/carImages/obfuscatedStockRef/" + obfuscatedStockRef);
                Result imageLinks = route(imageLinksRequest);
                String imageLinksString = contentAsString(imageLinks);
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/350/f");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/350/i");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/350/r");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/350/4");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/350/5");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/350/6");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/800/f");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/800/i");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/800/r");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/800/4");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/800/5");
                assertThat(imageLinksString).contains("http://vcache.arnoldclark.com/imageserver/ARNCI-U-27455/800/6");

            }
        });
    }


}
