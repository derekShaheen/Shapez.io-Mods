// @ts-nocheck
const METADATA = {
    website: "https://steamcommunity.com/id/Skrip037/",
    author: "tobspr & Skrip",
    name: "Sandbox",
    version: "1.1.0",
    id: "sk-sandbox",
    description:
        "Enables the sandbox mode.",

    minimumGameVersion: ">=1.5.0",
    modId: "1863733",
};

class Mod extends shapez.Mod {
    init() {
        this.modInterface.replaceMethod(shapez.Blueprint, "getCost", function () {
            return 0;
        });
        this.modInterface.replaceMethod(shapez.HubGoals, "isRewardUnlocked", function () {
            return true;
        });

        this.modInterface.addNewBuildingToToolbar({
            toolbar: "regular",
            location: "primary",
            metaClass: shapez.MetaItemProducerBuilding,
        });

        this.modInterface.addNewBuildingToToolbar({
            toolbar: "wires",
            location: "primary",
            metaClass: shapez.MetaItemProducerBuilding,
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
