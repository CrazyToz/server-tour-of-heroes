package hello;

import java.util.Collection;

/**
 * Created by chosotte on 17/02/16.
 */
public interface HeroService {

    Collection<Hero> getAllHeroes() throws Exception;
    Hero getHero(String id) throws Exception;
    Hero updateHero(Hero hero) throws Exception;
}
