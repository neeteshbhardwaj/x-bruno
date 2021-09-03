import * as React from 'react';
import { Blurhash } from "react-blurhash";
import './Wallpaper.css';
import { ButtonGroup } from 'react-bootstrap';
import { ArrowRepeat, Arrow90degRight } from 'react-bootstrap-icons';
import UserSettingsProvider from '../../helpers/UserSettingsProvider';
import DataUrlProvider from '../../helpers/DataUrlProvider';
import LoadingBar from 'react-top-loading-bar';

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
            this.setState({ wallpaper: wallpaper, progress: 10 });
            this.animateProgressBar(90, false);
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

    animateProgressBar(percentage: number, quick: boolean) {
        if (quick) {
            const progressAnimationId = this.state.progressAnimationId;
            if (null != progressAnimationId) clearInterval(progressAnimationId);
            this.setState({ progress: percentage });
        } else {
            const progressAnimationId = setInterval(() => {
                const progress = this.state.progress;
                const addition = (progress <= percentage) ? 1 : 0;
                this.setState({ progress: progress + addition });
            }, 300);
            this.setState({ progressAnimationId: progressAnimationId });
        }
    }

    render() {
        const wallpaper = this.state.wallpaper;
        const progress = this.state.progress;
        if (wallpaper) return (
            <div>
                <LoadingBar color={wallpaper.color}
                    progress={progress}
                    shadow={true}
                    onLoaderFinished={() => this.animateProgressBar(0, true)}
                />
                <Blurhash className="wallpaper"
                    hash={wallpaper.blur_hash}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />

                <div className="wallpaper" >
                    <img src={wallpaper.urls.full} onLoad={() => this.animateProgressBar(100, true)} />
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