// @ts-nocheck
const METADATA = {
    website: "https://steamcommunity.com/id/Skrip037/",
    author: "tobspr",
    name: "Sandbox",
    version: "1.1.0",
    id: "sk-sandbox",
    description:
        "Enables the sandbox mode.",

    minimumGameVersion: ">=1.5.0",
    modId: "1863733",
    api_key: "5cf048938401c69a7e2293a8c4a17afa",
};

// Variables for version checking
var verElement = "";
var verNeedUpdate = false;
var verUpdateChecked = false;
var verLatestVersion = "";
var verLatestLink = "";
///


class Mod extends shapez.Mod {
    init() {
        this.modInterface.replaceMethod(shapez.Blueprint, "getCost", function () {
            return 0;
        });
        this.modInterface.replaceMethod(shapez.HubGoals, "isRewardUnlocked", function () {
            return true;
        });

        var check = {
            compareVersionNumbers: function (v1, v2) {
                var v1parts = v1.split('.');
                var v2parts = v2.split('.');

                for (var i = 0; i < v1parts.length; ++i) {
                    if (v2parts.length === i) {
                        return 1;
                    }

                    if (v1parts[i] === v2parts[i]) {
                        continue;
                    }
                    if (v1parts[i] > v2parts[i]) {
                        return 1;
                    }
                    return -1;
                }

                if (v1parts.length != v2parts.length) {
                    return -1;
                }

                return 0;
            },
            version: function () {
                try {
                    if (check.compareVersionNumbers(METADATA.version, verLatestVersion) < 0) {
                        verNeedUpdate = true;
                    }
                }
                catch (error) {
                    console.error(error);
                }
                finally {
                    verUpdateChecked = true;
                }
            },
        }

        const headers = {
            'Accept': 'application/json'

        };
        fetch('https://api.mod.io/v1/games/2978/mods/' + METADATA.modId + '?' + 'api_key=' + METADATA.api_key,
            {
                method: 'GET',

                headers: headers
            })
            .then(function (res) {
                return res.json();
            }).then(function (body) {
                console.log("Latest version found for " + METADATA.name + "(" + METADATA.version + "): " + body.modfile.version);
                verLatestVersion = body.modfile.version;
                verLatestLink = body.profile_url;
                check.version();
            });

        this.signals.stateEntered.add(state => {
            if (state.key === "MainMenuState" && verNeedUpdate) {
                verElement = document.createElement("div");
                var parent = document.querySelector("#state_MainMenuState > div.mainWrapper");
                parent.style.cssText += 'grid-row-gap:calc(3px*var(--ui-scale));';

                verElement.id = "sk_upd_note_" + METADATA.name.split(" ").join("");
                parent.appendChild(verElement);

                const button = document.createElement("button");
                button.classList.add("styledButton");
                button.innerText = "Version (" + verLatestVersion + ") is available for " + METADATA.name + " (" + METADATA.version + ")";
                button.addEventListener("click", () => {
                    this.app.platformWrapper.openExternalLink(verLatestLink);
                });
                verElement.appendChild(button);
            }
        });

        this.modInterface.registerCss(`
                #sk_upd_note_` + METADATA.name.split(" ").join("") + ` {
                    z-index: 0;
                    display: block;
                    grid-column: 2 / 3;
                }
            `);
    }
}
