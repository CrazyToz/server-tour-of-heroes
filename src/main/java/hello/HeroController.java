package hello;

import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import java.util.Collection;

/**
 * Created by chosotte on 17/02/16.
 */
@RestController
public class HeroController {

    @Resource
    private HeroService heroService;

    @CrossOrigin(origins = "http://127.0.0.1:48201")
    @RequestMapping(value = "/heroes/update", method = RequestMethod.POST)
    public Hero updateHero(@RequestBody Hero hero) throws Exception {
        return this.heroService.updateHero(hero);
    }

    @CrossOrigin(origins = "http://127.0.0.1:48201")
    @RequestMapping("/heroes")
    public Collection<Hero> heroes() throws Exception {
        return this.heroService.getAllHeroes();
    }

    @CrossOrigin(origins = "http://127.0.0.1:48201")
    @RequestMapping(value = "/heroes/{id}", method = RequestMethod.GET)
    public Hero getHero(@PathVariable(value = "id") String id) throws Exception{
        return this.heroService.getHero(id);
    }

}
