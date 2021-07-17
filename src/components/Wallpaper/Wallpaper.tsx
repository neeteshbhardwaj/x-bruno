import * as React from 'react';
import { Blurhash } from "react-blurhash";
import './Wallpaper.css';
import { ButtonGroup } from 'react-bootstrap';
import { ArrowRepeat, Arrow90degRight } from 'react-bootstrap-icons';
import UserSettingsProvider from '../../helpers/UserSettingsProvider';
import DataUrlProvider from '../../helpers/DataUrlProvider';

class Wallpaper extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.fetchWallpaper("current");
    }

    fetchWallpaper(which: string) {
        const loadWallpaper = (wallpaperNo: number, wallpaper: {}) => {
            this.setState({ wallpaper: wallpaper, progress: 'fetched' });
            UserSettingsProvider.set({ wallpaperSettings: { whenUsed: new Date().getTime(), lastUsed: wallpaperNo } });
        };
        const doFetch = (wallpaperNo: number) => DataUrlProvider.get("wallpapers", wallpaperNo)
            .then(urlInfo => fetch(urlInfo.url)
                .then(res => res.json())
                .then(wallpapers => loadWallpaper(wallpaperNo, wallpapers[wallpaperNo % urlInfo.pageSize])));

        UserSettingsProvider.get()
            .then(userSettings => userSettings.wallpaperSettings)
            .then((wallpaperSettings = { lastUsed: 1 }) => wallpaperSettings.lastUsed)
            .then(lastUsed => lastUsed + (which == "current" ? 0 : 1))
            .then(doFetch);
    }

    openInNewTab() {
        window.open(this.state.wallpaper.links.html, "_wallpaper");
    }

    render() {
        const wallpaper = this.state.wallpaper;
        if (wallpaper) return (
            <div>
                <Blurhash className="wallpaper"
                    hash={wallpaper.blur_hash}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />

                <div className="wallpaper" style={{ backgroundImage: `url('${wallpaper.urls.full}')` }}>
                    <div className="details position-absolute bottom-0 end-0">
                        <span className="item action-panel touch-up"></span>
                        <span className="item action-panel panel">
                            <ButtonGroup>
                                <ArrowRepeat className="icon" onClick={() => this.fetchWallpaper("next")} />
                                <Arrow90degRight className="icon" onClick={() => this.openInNewTab()} />
                            </ButtonGroup>
                        </span>
                        <span className="item info-panel touch-up"></span>
                        <span className="item info-panel panel">{wallpaper.user.location}</span>
                    </div>
                </div>
            </div>
        );
        else return (<div className="wallpaper brand-name">
            <div className="details position-absolute bottom-0 end-0">
                <span className="item info-panel touch-up"></span>
                <span className="item info-panel panel">Bruno!</span>
            </div>
        </div>);
    }
}

export default Wallpaper