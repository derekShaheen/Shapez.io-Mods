// @ts-nocheck
const METADATA = {
    website: "https://steamcommunity.com/id/Skrip037/",
    author: "Skrip",
    name: "SkUpdate - Update Notifier",
    version: "0.9.0",
    id: "sk-update",
    description:
        "Checks the version of all compatible mods and displays if there is an update.",

    minimumGameVersion: ">=1.5.0",
    modId: "1870560",
    api_key: "5cf048938401c69a7e2293a8c4a17afa",
};

// Variables for version checking
var verElement = ""; // Display element
var verInstalledMods = []; // List of installed mods to compare against
var verModIds = []; // Store mod ids separately for optimized compare
var verModsToUpdate = []; // List of mods that need to be updated
var verModLatestVersion = []; // List of latest versions for comparison
var verModLink = []; // List that contains links for mods that need to be updated
///


class Mod extends shapez.Mod {
    init() {
        console.log("(SkUpdate) ==> CHECKING MOD VERSIONS - Sending request");

        // Send the request
        const headers = {
            'Accept': 'application/json'

        };

        fetch('https://api.mod.io/v1/games/2978/mods' + '?' + 'api_key=' + METADATA.api_key, // Pull all mods
            {
                method: 'GET',

                headers: headers
            })
            .then(function (res) {
                return res.json();
            }).then(function (body) {
                console.log("(SkUpdate) ==> Response received from mod.io - Processing")
                check.allMods(body);
            });

        verInstalledMods.push(this); // This mod doesn't detect itself, because it hasn't completed init() yet. Add it manually.
        verModIds.push(this.metadata.modId.toString()); // Add our id for easy comparison

        for (let m = 0; m < this.modLoader.mods.length; m++) { // Process all mods
            var mod = this.modLoader.mods[m];
            if (mod.metadata.modId && mod.metadata.ignoreSkUpdater !== 1) { // Is the mod supported and does not want to be ignored?
                verInstalledMods.push(mod);
                verModIds.push(mod.metadata.modId.toString());
            }
        }

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
            version: function (v1, v2) { // Return true if update needed
                try {
                    if (check.compareVersionNumbers(v1, v2) < 0) { // METADATA.version, verLatestVersion
                        return true;
                    }
                    return false;
                }
                catch (error) {
                    console.error(error); // Just throw an error and move on to the next mod. Should only error if corrupted data
                }
            },
            allMods: function (modJson) {
                try {
                    if (verInstalledMods) {
                        for (let i = 0; i < modJson.data.length; i++) { // Loop over all mods
                            var jmod = modJson.data[i];
                            var modIndex = verModIds.indexOf(jmod.id.toString()); // For the mod we are examining, do we have it installed?
                            if (modIndex > -1) { // Yes we do.
                                if (check.version(verInstalledMods[modIndex].metadata.version, jmod.modfile.version)) { // Compare the versions
                                    console.log("(SkUpdate) => " + verInstalledMods[modIndex].metadata.name + " (" + verInstalledMods[modIndex].metadata.version + ") => (" + jmod.modfile.version + ") [NEW]");
                                    verModsToUpdate.push(verInstalledMods[modIndex]); // Need to update this mod - push data to the arrays (These will be converted to proper objects in a future version of this)
                                    verModLatestVersion.push(jmod.modfile.version);
                                    verModLink.push(jmod.profile_url);
                                } else {
                                    console.log("(SkUpdate) => " + verInstalledMods[modIndex].metadata.name + " (" + verInstalledMods[modIndex].metadata.version + ") => (" + jmod.modfile.version + ") [UP TO DATE]");
                                }
                            }
                        }
                    }
                }
                catch (error) {
                    console.error(error);
                }
            },
        }

        this.signals.stateEntered.add(state => {
            if (state.key === "MainMenuState" && verModsToUpdate.length > 0) {
                var parent = document.querySelector("#state_MainMenuState > div.mainWrapper");
                parent.style.cssText += 'grid-row-gap:calc(3px*var(--ui-scale));';

                for (let i = 0; i < verModsToUpdate.length; i++) {
                    verElement = document.createElement("div");
                    var curMod = verModsToUpdate[i];
                    if (verModsToUpdate.length > 3 && i % 2 == 0) { // Is the index even or odd? (should it go on the left or right?). Place all on right unless more than 3 mods.
                        verElement.id = "sk_upd_note_left"; // even
                    } else {
                        verElement.id = "sk_upd_note_right"; // odd
                    }
                    
                    parent.appendChild(verElement);

                    const button = document.createElement("button");
                    button.classList.add("styledButton");
                    button.innerText = "Version (" + verModLatestVersion[i] + ") is available for " + curMod.metadata.name + " (" + curMod.metadata.version + ")";
                    button.addEventListener("click", () => {
                        this.app.platformWrapper.openExternalLink(verModLink[i]);
                    });
                    verElement.appendChild(button);
                }
            }
        });

        this.modInterface.registerCss(`
                #sk_upd_note_right {
                    z-index: 0;
                    display: block;
                    grid-column: 2;
                }
                #sk_upd_note_left {
                    z-index: 0;
                    display: block;
                    grid-column: 1;
                }
            `);
    }
}
