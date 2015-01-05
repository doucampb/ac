package controllers;

import play.*;
import play.libs.Json;
import play.mvc.*;
import views.html.*;

import java.util.ArrayList;
import java.util.List;


public class Application extends Controller {

    public static String VCACHE_URL = "http://vcache.arnoldclark.com/imageserver/";

    /**
     * Load our main view
     */
    public static Result index() {
        return ok(views.html.index.render());
    }

    /**
     * Return the hyperlinks as JSON
     *
     * @param obfuscatedStockRef   The obfuscated stock reference
     * @return The List returned as JSON or not found.
     */
    public static Result getImageLinks(String obfuscatedStockRef) {

        if (obfuscatedStockRef == null) {
            return notFound("No obfuscated stock reference passed");
        } else {
            List<String> hyperLinks = generateImages(obfuscatedStockRef);
            return ok(Json.toJson(hyperLinks));
        }
    }

    /**
     * Construct a list of all possible hyperlinks using the obfuscated stock reference
     *
     * @param obfuscatedStockReference   The obfuscated stock reference
     * @return a list containing the hyperlinks to the vehicle images
     */
    private static List<String> generateImages(String obfuscatedStockReference) {
        String[] sizes = {"350", "800"};
        String[] cameras = {"f", "i", "r", "4", "5", "6"};
        List<String> hyperLinks = new ArrayList<String>();
        for (String size : sizes) {
            for (String cam : cameras) {
                hyperLinks.add(VCACHE_URL
                        + obfuscatedStockReference + "/" + size + "/" + cam);
            }
        }
        return hyperLinks;
    }

    /**
     * Construct the obfuscated stock reference
     *
     * @param stockReference The stock reference
     * @param registration   The vehicle registration
     * @return The obfuscated stock reference
     */
    private static String obfuscateStockReference(String stockReference, String registration) {
        StringBuffer sb = new StringBuffer();
        if (stockReference != null && registration != null) {
            for (int i = 0; i < Math.min(stockReference.length(), registration.length()); i++) {
                sb.append(stockReference.charAt(i));
                sb.append(registration.charAt(registration.length() - i - 1));
            }
            // Add 9th character to obfuscated stock reference
            if (stockReference.length() >= 9) {
                sb.append(stockReference.charAt(8));
            }
        }
        return sb.toString();
    }

    /**
     * Get the obfuscated stock reference as JSON
     */
    public static Result getObfuscatedStockRefJSON(String stockReference, String registration) {
        return ok(Json.toJson(obfuscateStockReference(stockReference, registration)));
    }
}
