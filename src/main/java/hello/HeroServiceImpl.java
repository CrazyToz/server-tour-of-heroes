package hello;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;

/**
 * Created by chosotte on 17/02/16.
 */
@Service(value = "heroService")
public class HeroServiceImpl implements HeroService {

    private final String pathToJsonFile = "/home/chosotte/IdeaProjects/spring-boot-tutorial/src/main/resources/heroes.json";

    @Override
    public Hero updateHero(Hero hero) throws Exception {
        ObjectMapper m = new ObjectMapper();
        File json = new File(pathToJsonFile);
        JsonNode rootArray = m.readTree(json);
        boolean isId = false;
        for(JsonNode root : rootArray) {
            JsonNode id = root.path("id");
            if (id.intValue() == hero.getId()) {
                isId = true;
                ((ObjectNode) root).remove("name");
                ((ObjectNode) root).put("name", hero.getName());
                break;
            }
        }
        if (! isId)
            throw new Exception("No hero found with id : " + hero.getId());
        m.writeValue(json, rootArray);
        return hero;
    }

    @Override
    public Collection<Hero> getAllHeroes() throws Exception{
        ObjectMapper mapper = new ObjectMapper();
        return  mapper.readValue(new File(pathToJsonFile), new TypeReference<List<Hero>>(){});
    }

    @Override
    public Hero getHero(String id) throws Exception {
        // TODO: 18/02/16 pas très opti, opter pour Streaming API : http://wiki.fasterxml.com/JacksonInFiveMinutes#Full_Data_Binding_.28POJO.29_Example
        List<Hero> heroes = new LinkedList<Hero>(this.getAllHeroes());
        ListIterator<Hero> listIterator = heroes.listIterator();
        while (listIterator.hasNext()) {
            Hero currentHero = listIterator.next();
            if (Integer.parseInt(id) == currentHero.getId())
                return currentHero;
        }
        throw new Exception("No hero found with id : " + id);
    }
}
