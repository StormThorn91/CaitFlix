import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL, } from "./config";
import { TVShowAPI } from "./api/tv-show"
import { TVShowDetail } from "./components/TVShowDetail/TVShowData";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { Logo } from "./components/Logo/Logo";
import logoImg from "./assets/images/caitflix-logo.png"
import s from "./style.module.css"
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
    const [currentTvShow, setCurrentTvShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        try {
            const popularTVShowList = await TVShowAPI.fetchPopulars();
            if (popularTVShowList.length > 0) {
                setCurrentTvShow(popularTVShowList[0]);
            }
        } catch (error) {
            alert("Something went wrong when fetching popular TV shows");
        }

    }

    async function fetchRecommendations(tvShowId) {
        try {
            const recommendationListResp = await TVShowAPI.fetchRecommendations(tvShowId);
            if (recommendationListResp.length > 0) {
                setRecommendationList(recommendationListResp.slice(0, 10));
            }
        } catch (error) {
            alert("Something went wrong when fetching recommendations");
        }


    }

    async function fetchByTitle(title) {
        try {
            const searchResponse = await TVShowAPI.fetchByTitle(title);
            if (searchResponse.length > 0) {
                setCurrentTvShow(searchResponse[0]);
            }
        } catch (error) {
            alert("Something went wrong when fetching searched TV show");

        }

    }
    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if (currentTvShow) {
            fetchRecommendations(currentTvShow.id);

        }
    }, [currentTvShow]);

    const updateCurrentTVShow = (tvShow) => {
        setCurrentTvShow(tvShow)
    }
    return (
        <div className={s.main_container}
            style={{
                background: currentTvShow ?
                    `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
               url("${BACKDROP_BASE_URL}${currentTvShow.backdrop_path}") no-repeat center / cover`
                    : "black"
            }}>
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <div><Logo img={logoImg} title="CaitFlix" subtitle="Shows what Caitlin likes..." /></div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <SearchBar onSubmit={fetchByTitle} />
                    </div>

                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTvShow && <TVShowDetail tvShow={currentTvShow} />}
            </div>
            <div className={s.recommended_tv_shows}>
                {currentTvShow && <TVShowList onClickItem={updateCurrentTVShow} tvShowList={recommendationList} />}
            </div>
        </div>
    )
}