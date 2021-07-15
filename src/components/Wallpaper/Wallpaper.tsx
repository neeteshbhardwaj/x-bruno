import * as React from 'react';
import { createApi } from 'unsplash-js';
import { Blurhash } from "react-blurhash";
import './Wallpaper.css';
import { ButtonGroup } from 'react-bootstrap';
import { ArrowRepeat, BoxArrowUpRight } from 'react-bootstrap-icons';

class Wallpaper extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
        const defaultWallpaper = {
            blur_hash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
            urls: {
                full: ""
            },
            location: {
                title: "Bruno!"
            },
            links: {
                html: ""
            }
        };

        this.state = {
            currentWallpaper: defaultWallpaper
        };
    }

    componentDidMount() {
        this.fetchNewWallpaper();
    }

    fetchNewWallpaper() {
        const apiParams = { accessKey: "2c9dcd6b8254123aefe8230efdf3c59258a74aa867d3b4eafce4e95673974487" };
        const unsplash = createApi(apiParams);
        unsplash.photos.getRandom({ query: "wallpaper" }).then(result => {
            if (result.errors) console.log('error occurred: ', result.errors[0]);
            else this.setState({ currentWallpaper: result.response });
        });
    }

    openInNewTab() {
        window.open(this.state.currentWallpaper.links.html, "_wallpaper");
    }

    render() {
        const wallpaper = this.state.currentWallpaper;
        return (
            <div>
                <Blurhash className="wallpaper"
                    hash={wallpaper.blur_hash}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
                <div className="wallpaper" style={{ backgroundImage: `url('${wallpaper.urls.full}')` }}>
                    <div className="details position-absolute bottom-0 end-0">
                        <div className="text-end actions">
                            <ButtonGroup>
                                <ArrowRepeat className="icon" onClick={() => this.fetchNewWallpaper()} />
                                <BoxArrowUpRight className="icon" onClick={() => this.openInNewTab()} />
                            </ButtonGroup>
                        </div>
                        <div className="">
                            <div className="item touch-up"></div>
                            <div className="item info">{wallpaper.location.title}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wallpaper