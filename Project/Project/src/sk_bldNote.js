﻿// @ts-nocheck
const METADATA = {
    website: "https://steamcommunity.com/id/Skrip037/",
    author: "Skrip",
    name: "Note Building",
    version: "1.1.8",
    id: "sk-note-building",
    description:
        "Adds a new building which allows you to place a note on the plane.",

    minimumGameVersion: ">=1.5.0",
    modId: "1860290",
    api_key: "5cf048938401c69a7e2293a8c4a17afa",
};

var updateChecked = false;
var latestVersion = "";

const enumNoteSize = {
    [shapez.defaultBuildingVariant]: "Normal", // 2x1
    Single: "Single",   // 1x1
    Normal: "Normal",   // 2x1
    Large:  "Large",    // 2x2
    Long:   "Long",     // 3x1
    ExLarge: "ExLarge", // 3x3
    SLarge: "SLarge",   // 5x5
};

class MetaNoteBuilding extends shapez.ModMetaBuilding {
    constructor() {
        super("SkNoteBuilding");
    }

    static getAllVariantCombinations() {
        return [
            {
                name: "Note Building",
                description: "(1x1) Allows the player to set a note on the field. Wire toggle on top. Send truth signal to disable.",
                variant: shapez.defaultBuildingVariant,

                regularImageBase64: RESOURCES.note.base,
                blueprintImageBase64: RESOURCES.note.blueprint,
                tutorialImageBase64: RESOURCES.note.icon,
            },
            {
                name: "Note Building (Long)",
                description: "(2x1) Allows the player to set a note on the field. Wire toggle on top. Send truth signal to disable.",
                variant: enumNoteSize.Normal,

                regularImageBase64: RESOURCES.note_long.base,
                blueprintImageBase64: RESOURCES.note.blueprint,
                tutorialImageBase64: RESOURCES.note_long.icon,
            },
            {
                name: "Note Building",
                description: "(2x2) Allows the player to set a note on the field. Wire toggle on top. Send truth signal to disable.",
                variant: enumNoteSize.Large,

                regularImageBase64: RESOURCES.note.base,
                blueprintImageBase64: RESOURCES.note.blueprint,
                tutorialImageBase64: RESOURCES.note.icon,
            },
            {
                name: "Note Building (Long)",
                description: "(3x1) Allows the player to set a note on the field. Wire toggle on top. Send truth signal to disable.",
                variant: enumNoteSize.Long,

                regularImageBase64: RESOURCES.note_long.base,
                blueprintImageBase64: RESOURCES.note.blueprint,
                tutorialImageBase64: RESOURCES.note_long.icon,
            },
            {
                name: "Note Building",
                description: "(3x3) Allows the player to set a note on the field. Wire toggle on top. Send truth signal to disable.",
                variant: enumNoteSize.ExLarge,

                regularImageBase64: RESOURCES.note.base,
                blueprintImageBase64: RESOURCES.note.blueprint,
                tutorialImageBase64: RESOURCES.note.icon,
            },
            {
                name: "Note Building",
                description: "(5x5) Allows the player to set a note on the field. Wire toggle on top. Send truth signal to disable.",
                variant: enumNoteSize.SLarge,

                regularImageBase64: RESOURCES.note.base,
                blueprintImageBase64: RESOURCES.note.blueprint,
                tutorialImageBase64: RESOURCES.note.icon,
            },
        ];
    }

    getAvailableVariants(root) {
        return [shapez.defaultBuildingVariant, enumNoteSize.Normal, enumNoteSize.Large, enumNoteSize.Long, enumNoteSize.ExLarge, enumNoteSize.SLarge];
    }

    updateVariants(entity, rotationVariant, variant) {
        const noteSize = enumNoteSize[variant];
        entity.components.SkNote.NoteSize = noteSize;
    }

    getSilhouetteColor() {
        return "#E3FBFF";
    }

    getDimensions(variant) {
        switch (variant) {
            case shapez.defaultBuildingVariant:
                return new shapez.Vector(1, 1);
                break;
            case enumNoteSize.Single:
                return new shapez.Vector(1, 1);
                break;
            case enumNoteSize.Normal:
                return new shapez.Vector(2, 1);
                break;
            case enumNoteSize.Large:
                return new shapez.Vector(2, 2);
                break;
            case enumNoteSize.Long:
                return new shapez.Vector(3, 1);
                break;
            case enumNoteSize.ExLarge:
                return new shapez.Vector(3, 3);
                break;
            case enumNoteSize.SLarge:
                return new shapez.Vector(5, 5);
                break;
            default:
                return new shapez.Vector(1, 1);
                break;
        }
    }

    /**
     * @param {GameRoot} root
     */
    getIsUnlocked(root) {
        //return root.hubGoals.isRewardUnlocked(shapez.enumHubGoalRewards.reward_storage);
        return true;
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(
            new shapez.WiredPinsComponent({
                slots: [
                    {
                        pos: new shapez.Vector(0, 0),
                        direction: shapez.enumDirection.top,
                        type: shapez.enumPinSlotType.logicalAcceptor,
                    },
                ],
            })
        );

        entity.addComponent(new SkNoteComponent());
    }
}


//class MetaNoteBuildingWired extends shapez.ModMetaBuilding {
//    constructor() {
//        super("SkNoteBuildingWired");
//    }

//    static getAllVariantCombinations() {
//        return [
//            {
//                name: "Note Building (Wired)",
//                description: "(1x1) Allows the player to set a note on the field.",
//                variant: shapez.defaultBuildingVariant,

//                regularImageBase64: RESOURCES.note.base,
//                blueprintImageBase64: RESOURCES.note.blueprint,
//                tutorialImageBase64: RESOURCES.note.icon,
//            },
//            {
//                name: "Note Building (Wired)",
//                description: "(2x1) Allows the player to set a note on the field.",
//                variant: enumNoteSize.Normal,

//                regularImageBase64: RESOURCES.note.base,
//                blueprintImageBase64: RESOURCES.note.blueprint,
//                tutorialImageBase64: RESOURCES.note.icon,
//            },
//            {
//                name: "Note Building (Wired)",
//                description: "(2x2) Allows the player to set a note on the field.",
//                variant: enumNoteSize.Large,

//                regularImageBase64: RESOURCES.note.base,
//                blueprintImageBase64: RESOURCES.note.blueprint,
//                tutorialImageBase64: RESOURCES.note.icon,
//            },
//            {
//                name: "Note Building (Wired)",
//                description: "(3x1) Allows the player to set a note on the field.",
//                variant: enumNoteSize.Long,

//                regularImageBase64: RESOURCES.note.base,
//                blueprintImageBase64: RESOURCES.note.blueprint,
//                tutorialImageBase64: RESOURCES.note.icon,
//            },
//            {
//                name: "Note Building (Wired)",
//                description: "(3x3) Allows the player to set a note on the field.",
//                variant: enumNoteSize.ExLarge,

//                regularImageBase64: RESOURCES.note.base,
//                blueprintImageBase64: RESOURCES.note.blueprint,
//                tutorialImageBase64: RESOURCES.note.icon,
//            },
//        ];
//    }

//    getAvailableVariants(root) {
//        return [shapez.defaultBuildingVariant, enumNoteSize.Normal, enumNoteSize.Large, enumNoteSize.Long, enumNoteSize.ExLarge];
//    }

//    updateVariants(entity, rotationVariant, variant) {
//        const noteSize = enumNoteSize[variant];
//        entity.components.SkNote.NoteSize = noteSize;
//    }

//    getSilhouetteColor() {
//        return "#bbdf6d";
//    }

//    getDimensions(variant) {
//        switch (variant) {
//            case shapez.defaultBuildingVariant:
//                return new shapez.Vector(1, 1);
//                break;
//            case enumNoteSize.Single:
//                return new shapez.Vector(1, 1);
//                break;
//            case enumNoteSize.Normal:
//                return new shapez.Vector(2, 1);
//                break;
//            case enumNoteSize.Large:
//                return new shapez.Vector(2, 2);
//                break;
//            case enumNoteSize.Long:
//                return new shapez.Vector(3, 1);
//                break;
//            case enumNoteSize.ExLarge:
//                return new shapez.Vector(3, 3);
//                break;
//            default:
//                return new shapez.Vector(1, 1);
//                break;
//        }
//    }

//    getLayer() {
//        return "wires";
//    }

//    /**
//     * @param {GameRoot} root
//     */
//    getIsUnlocked(root) {
//        return root.hubGoals.isRewardUnlocked(shapez.enumHubGoalRewards.reward_wires_painter_and_levers);
//        return true;
//    }

//    /**
//     * Creates the entity at the given location
//     * @param {Entity} entity
//     */
//    setupEntityComponents(entity) {
//        entity.addComponent(new SkNoteComponent());
//    }
//}

////////////////////////////////////////////////////////////////////////
class SkNoteComponent extends shapez.Component {

    static getId() {
        return "SkNote";
    }

    static getSchema() {
        return {
            NoteText: shapez.types.string,
            NoteFontSize: shapez.types.int,
            NoteSize: shapez.types.string,
        };
    }

    constructor(noteSize = enumNoteSize.Normal) {
        super();
        this.NoteText = "";
        this.NoteFontSize = 8;
        this.NoteSize = noteSize;
    }
}


////////////////////////////////////////////////////////////////////////
class SkNoteSystem extends shapez.GameSystemWithFilter {
    constructor(root) {
        super(root, [SkNoteComponent]);

        // Ask for a notification text once an entity is placed
        this.root.signals.entityManuallyPlaced.add(entity => {
            const editorHud = this.root.hud.parts.SkNoteEdit;
            if (editorHud) {
                editorHud.editNoteText(entity, { deleteOnCancel: true });
            }
        });
    }

    update() {
        this.checkVersion();
    }

    checkVersion() {
        if (!this.root.gameInitialized || updateChecked || latestVersion === "") {
            return;
        }
        try {
            if (this.compareVersionNumbers(METADATA.version, latestVersion) < 0) {
                this.root.hud.signals.notification.dispatch(
                    "(" + METADATA.version + ") " + METADATA.name + " is out of date. " + latestVersion + " is now available.",
                    shapez.enumNotificationType.warning
                );
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            updateChecked = true;
        }
    }

    compareVersionNumbers(v1, v2) {
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
    }

    drawChunk(parameters, chunk) {
        const contents = chunk.containedEntitiesByLayer.regular;
        for (let i = 0; i < contents.length; ++i) {
            const entity = contents[i];
            const SkNoteComp = entity.components.SkNote;
            if (!SkNoteComp) {
                continue;
            }

            const pinsComp = entity.components.WiredPins;
            const network = pinsComp.slots[0].linkedNetwork;

            if (!network || !network.hasValue() || shapez.isTruthyItem(network.currentValue)) { // If network not connected, or the line is positive. If negative, do not display message
                const staticComp = entity.components.StaticMapEntity;
                const context = parameters.context;
                const center = staticComp.getTileSpaceBounds().getCenter().toWorldSpace();

                if (parameters.visibleRect.containsCircle(center.x, center.y, 40) && SkNoteComp.NoteText.length > 0) {
                    var lines = SkNoteComp.NoteText.split("//");

                    for (var ln = 0; ln < lines.length; ln++) {
                        if (network && network.hasValue() && network.currentValue.getItemType() === "color") {
                            context.fillStyle = network.currentValue.color;
                        } else {
                            context.fillStyle = "black";
                        }
                        context.textAlign = "center";
                        if (lines.length > 1) {
                            context.font = "bold " + SkNoteComp.NoteFontSize + "px GameFont";
                            if (SkNoteComp.NoteFontSize <= 14) {
                                context.fillText(lines[ln], center.x, center.y + (11 * ln) - (4 * lines.length)); // if 3 lines, move them all up by one
                            } else {
                                context.fillText(lines[ln], center.x, center.y + (SkNoteComp.NoteFontSize * ln) - (4 * lines.length)); // if 3 lines, move them all up by one
                            }

                        } else {
                            context.font = "bold " + SkNoteComp.NoteFontSize + "px GameFont";
                            if (SkNoteComp.NoteFontSize <= 8) {
                                context.fillText(lines[ln], center.x, center.y - 4 + (11 * ln));
                            } else {
                                context.fillText(lines[ln], center.x, center.y + 4 + (11 * ln));
                            }
                        }
                    }
                }
            }
        }

        //const contentsWires = chunk.containedEntitiesByLayer.wires;
        //for (let i = 0; i < contentsWires.length; ++i) {
        //    const entity = contentsWires[i];
        //    const SkNoteComp = entity.components.SkNote;
        //    if (!SkNoteComp) {
        //        continue;
        //    }

        //    const staticComp = entity.components.StaticMapEntity;
        //    const context = parameters.context;
        //    const center = staticComp.getTileSpaceBounds().getCenter().toWorldSpace();

        //    if (parameters.visibleRect.containsCircle(center.x, center.y, 40)) {
        //        var lines = SkNoteComp.NoteText.split("\\n");

        //        for (var ln = 0; ln < lines.length; ln++) {
        //            context.fillStyle = "black";
        //            context.textAlign = "center";
        //            if (lines.length > 1) {
        //                context.font = "bold " + SkNoteComp.NoteFontSize + "px GameFont";
        //                if (SkNoteComp.NoteFontSize <= 14) {
        //                    context.fillText(lines[ln], center.x, center.y + (11 * ln) - (4 * lines.length)); // if 3 lines, move them all up by one
        //                } else {
        //                    context.fillText(lines[ln], center.x, center.y + (SkNoteComp.NoteFontSize * ln) - (4 * lines.length)); // if 3 lines, move them all up by one
        //                }

        //            } else {
        //                context.font = "bold " + SkNoteComp.NoteFontSize + "px GameFont";
        //                if (SkNoteComp.NoteFontSize <= 8) {
        //                    context.fillText(lines[ln], center.x, center.y - 4 + (11 * ln));
        //                } else {
        //                    context.fillText(lines[ln], center.x, center.y + 4 + (11 * ln));
        //                }
        //            }
        //        }
        //    }
        //}
    }
}

////////////////////////////////////////////////////////////////////////
// HUD Component to be able to edit notification blocks by clicking them
class HUDSkNoteEdit extends shapez.BaseHUDPart {
    initialize() {
        this.root.camera.downPreHandler.add(this.downPreHandler, this);
    }

    /**
     * @param {Vector} pos
     * @param {enumMouseButton} button
     */
    downPreHandler(pos, button) {

        const tile = this.root.camera.screenToWorld(pos).toTileSpace();
        const contents = this.root.map.getLayerContentXY(tile.x, tile.y, "regular");
        if (contents) {
            const SkNoteComp = contents.components.SkNote;
            if (SkNoteComp) {
                if (button === shapez.enumMouseButton.left) {
                    this.editNoteText(contents, {
                        deleteOnCancel: false,
                    });
                    return shapez.STOP_PROPAGATION;
                }
            }
        }

        //const contentsWired = this.root.map.getLayerContentXY(tile.x, tile.y, "wires");
        //if (contentsWired) {
        //    const SkNoteComp = contentsWired.components.SkNote;
        //    if (SkNoteComp) {
        //        if (button === shapez.enumMouseButton.left) {
        //            this.editNoteText(contentsWired, {
        //                deleteOnCancel: false,
        //            });
        //            return shapez.STOP_PROPAGATION;
        //        }
        //    }
        //}
    }

    /**
     * Asks the player to enter a notification text
     * @param {Entity} entity
     * @param {object} param0
     * @param {boolean=} param0.deleteOnCancel
     */
    editNoteText(entity, { deleteOnCancel = true }) {
        const SkNoteComp = entity.components.SkNote;
        if (!SkNoteComp) {
            return;
        }

        // save the uid because it could get stale
        const uid = entity.uid;

        // create an input field to query the text
        const strInput = new shapez.FormElementInput({
            id: "NoteText",
            placeholder: "Message to Display",
            defaultValue: SkNoteComp.NoteText,
            validator: val => val.length >= 0,
        });

        const intInput = new shapez.FormElementInput({
            id: "NoteFontSize",
            placeholder: "",
            defaultValue: SkNoteComp.NoteFontSize.toString(),
            validator: val => val.length > 0 && parseInt(val) >= 4 && parseInt(val) <= 35,
        });

        // create the dialog & show it
        const dialog = new shapez.DialogWithForm({
            app: this.root.app,
            title: shapez.T.mods.SkNote.title,
            desc: shapez.T.mods.SkNote.dialogText,
            formElements: [strInput, intInput],
            buttons: ["cancel:bad:escape", "ok:good:enter"],
            closeButton: false,
        });
        this.root.hud.parts.dialogs.internalShowDialog(dialog);

        // When confirmed, set the text
        dialog.buttonSignals.ok.add(() => {
            if (!this.root || !this.root.entityMgr) {
                // Game got stopped
                return;
            }

            const entityRef = this.root.entityMgr.findByUid(uid, false);
            if (!entityRef) {
                // outdated
                return;
            }

            const SkNoteComp = entityRef.components.SkNote;
            if (!SkNoteComp) {
                // no longer interesting
                return;
            }

            // set the values
            SkNoteComp.NoteText = strInput.getValue();
            SkNoteComp.NoteFontSize = parseInt(intInput.getValue());
        });

        // When cancelled, destroy the entity again
        if (deleteOnCancel) {
            dialog.buttonSignals.cancel.add(() => {
                if (!this.root || !this.root.entityMgr) {
                    // Game got stopped
                    return;
                }

                const entityRef = this.root.entityMgr.findByUid(uid, false);
                if (!entityRef) {
                    // outdated
                    return;
                }

                const SkNoteComp = entityRef.components.SkNote;
                if (!SkNoteComp) {
                    // no longer interesting
                    return;
                }

                this.root.logic.tryDeleteBuilding(entityRef);
            });
        }
    }
}

class Mod extends shapez.Mod {
    init() {

        this.modInterface.registerComponent(SkNoteComponent);
        // Register the new building
        this.modInterface.registerNewBuilding({
            metaClass: MetaNoteBuilding,
            buildingIconBase64: RESOURCES.note.icon,
        });

        // Add it to the regular toolbar
        this.modInterface.addNewBuildingToToolbar({
            toolbar: "regular",
            location: "secondary",
            metaClass: MetaNoteBuilding,
        });

        //this.modInterface.registerNewBuilding({
        //    metaClass: MetaNoteBuildingWired,
        //    buildingIconBase64: RESOURCES.note.icon,
        //});

        //this.modInterface.addNewBuildingToToolbar({
        //    toolbar: "wires",
        //    location: "secondary",
        //    metaClass: MetaNoteBuildingWired,
        //});

        this.modInterface.registerGameSystem({
            id: "SkNote",
            systemClass: SkNoteSystem,
            before: "constantSignal",
            drawHooks: ["staticAfter"],
        });

        this.modInterface.registerHudElement("SkNoteEdit", HUDSkNoteEdit);

        this.modInterface.registerTranslations("en", {
            mods: {
                SkNote: {
                    description:
                        "Allows the player to set a note on the ground.",
                    dialogText:
                        "Enter the note and font size to display. (Use // for new line)",
                    dialogFont:
                        "Enter the font size for the display.",
                    title:
                        "Note Building",
                },
            },
        });

        /////////////////////////

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
                latestVersion = body.modfile.version;
            });
    }

}

const RESOURCES = {
    note: {
        base: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAGACAYAAACkx7W/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAR0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA0LTE3VDA5OjQ4OjU5KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAzLTAxVDAyOjI3OjE3LTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMy0wMVQwMjoyNzoxNy0wNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MGMxN2UyMDQtMWE2YS1iNDRlLTliNzItMzExYWE4NzhmYTY0IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjAyMjZlNzctMzYwMy1iMzQwLWI0N2MtYTY5YzBiMjFlY2UyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpZUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiBleGlmOkNvbG9yU3BhY2U9IjEiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzODQiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIzODQiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRkMGU2OTJmLTk0ZTctNDA0Mi1hY2NiLTZlNzhhMzBlNTdmYyIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xN1QwOTo0ODo1OSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWI0NzcwZC1iM2ViLWQ1NDMtYmMyYi1lYzg5NjA2MTdjZGUiIHN0RXZ0OndoZW49IjIwMjAtMDQtMTdUMDk6NDk6NTQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2M3MTMxMjYtODczMy05MzQwLTg1ZGMtMmY2YmQyNTJhYjhhIiBzdEV2dDp3aGVuPSIyMDIwLTA5LTI0VDE2OjEwOjMyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc5Y2EyYjFlLWQzMDUtM2U0Zi05OTRkLWQxZTUyNjRlMzc0NSIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0yNFQxNjoxMDozMiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YmM5Y2Q3NC0wNWRmLThmNDAtOTlkMS0wMGZmOTU2ODdjMGUiIHN0RXZ0OndoZW49IjIwMjItMDItMjdUMTM6NTU6MDEtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWUwNWI0NjUtYmRlZi03OTRhLWJkZWMtOWJjZmJmZjlmMGY3IiBzdEV2dDp3aGVuPSIyMDIyLTAyLTI3VDEzOjU1OjAxLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBmYTYxMzRiLTc0ZmEtZDI0ZC05ZjVhLWUzMWJjY2U4Y2M1ZSIgc3RFdnQ6d2hlbj0iMjAyMi0wMy0wMVQwMjoyNzoxNy0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowYzE3ZTIwNC0xYTZhLWI0NGUtOWI3Mi0zMTFhYTg3OGZhNjQiIHN0RXZ0OndoZW49IjIwMjItMDMtMDFUMDI6Mjc6MTctMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGZhNjEzNGItNzRmYS1kMjRkLTlmNWEtZTMxYmNjZThjYzVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIi8+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iTk9URSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iTk9URSIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Ik5PVEUiIHBob3Rvc2hvcDpMYXllclRleHQ9Ik5PVEUiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjVjMTc3MmRjLTViNjMtODg0ZC04YWQ5LWU4MDU0OTBlN2U4YjwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3YmE5NzQyOC0xMmQ5LWY2NDAtYTA3ZC1hMTEyZGVkNDNjZGM8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkwMjU3YWEtYWE5My0yNTQyLTkzNTMtMzM2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khJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUQZAkhJlACQpUds6AHH1lyRp423rAEiSNo8BkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKREGQBJSpQBkKRE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",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAGACAYAAACkx7W/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAR0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA0LTE3VDA5OjQ4OjU5KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAzLTAxVDAyOjIzOjAzLTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMy0wMVQwMjoyMzowMy0wNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NmQ0NmViZjEtNTc0YS0zMDRhLTgwYzMtM2MwNTMwMmRmN2M1IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NWY5NDY4NmUtY2UzYS1hMDRjLWEyNmYtZjkxYjcxNWNkNThkIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpZUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiBleGlmOkNvbG9yU3BhY2U9IjEiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzODQiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIzODQiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRkMGU2OTJmLTk0ZTctNDA0Mi1hY2NiLTZlNzhhMzBlNTdmYyIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xN1QwOTo0ODo1OSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWI0NzcwZC1iM2ViLWQ1NDMtYmMyYi1lYzg5NjA2MTdjZGUiIHN0RXZ0OndoZW49IjIwMjAtMDQtMTdUMDk6NDk6NTQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2M3MTMxMjYtODczMy05MzQwLTg1ZGMtMmY2YmQyNTJhYjhhIiBzdEV2dDp3aGVuPSIyMDIwLTA5LTI0VDE2OjEwOjMyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc5Y2EyYjFlLWQzMDUtM2U0Zi05OTRkLWQxZTUyNjRlMzc0NSIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0yNFQxNjoxMDozMiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YmM5Y2Q3NC0wNWRmLThmNDAtOTlkMS0wMGZmOTU2ODdjMGUiIHN0RXZ0OndoZW49IjIwMjItMDItMjdUMTM6NTU6MDEtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWUwNWI0NjUtYmRlZi03OTRhLWJkZWMtOWJjZmJmZjlmMGY3IiBzdEV2dDp3aGVuPSIyMDIyLTAyLTI3VDEzOjU1OjAxLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMyMzg0MTI2LTE2NzUtNDU0YS05YzQ3LWM2MDQwYjZiOWI1YyIgc3RFdnQ6d2hlbj0iMjAyMi0wMy0wMVQwMjoyMzowMy0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ZDQ2ZWJmMS01NzRhLTMwNGEtODBjMy0zYzA1MzAyZGY3YzUiIHN0RXZ0OndoZW49IjIwMjItMDMtMDFUMDI6MjM6MDMtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YzIzODQxMjYtMTY3NS00NTRhLTljNDctYzYwNDBiNmI5YjVjIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIi8+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iTk9URSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iTk9URSIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Ik5PVEUiIHBob3Rvc2hvcDpMYXllclRleHQ9Ik5PVEUiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjVjMTc3MmRjLTViNjMtODg0ZC04YWQ5LWU4MDU0OTBlN2U4YjwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3YmE5NzQyOC0xMmQ5LWY2NDAtYTA3ZC1hMTEyZGVkNDNjZGM8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkwMjU3YWEtYWE5My0yNTQyLTkzNTMtMzM2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",
        blueprint: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAGACAYAAACkx7W/AAAACXBIWXMAAAsTAAALEwEAmpwYAAARRWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA0LTE3VDA5OjQ4OjU5KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAyLTI4VDA5OjQ0OjU0LTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0yOFQwOTo0NDo1NC0wNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZTllNzZiY2ItNTIzMi00MjQ1LTk4NTgtZGM2NjNiNDM3ZTA5IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6Y2EyNTFjOGMtYTQ2My01ODRiLWIxNjUtZGUyZjI2MmNiMmViIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpZUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiBleGlmOkNvbG9yU3BhY2U9IjEiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzODQiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIzODQiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRkMGU2OTJmLTk0ZTctNDA0Mi1hY2NiLTZlNzhhMzBlNTdmYyIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xN1QwOTo0ODo1OSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWI0NzcwZC1iM2ViLWQ1NDMtYmMyYi1lYzg5NjA2MTdjZGUiIHN0RXZ0OndoZW49IjIwMjAtMDQtMTdUMDk6NDk6NTQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2M3MTMxMjYtODczMy05MzQwLTg1ZGMtMmY2YmQyNTJhYjhhIiBzdEV2dDp3aGVuPSIyMDIwLTA5LTI0VDE2OjEwOjMyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc5Y2EyYjFlLWQzMDUtM2U0Zi05OTRkLWQxZTUyNjRlMzc0NSIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0yNFQxNjoxMDozMiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YmM5Y2Q3NC0wNWRmLThmNDAtOTlkMS0wMGZmOTU2ODdjMGUiIHN0RXZ0OndoZW49IjIwMjItMDItMjdUMTM6NTU6MDEtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWUwNWI0NjUtYmRlZi03OTRhLWJkZWMtOWJjZmJmZjlmMGY3IiBzdEV2dDp3aGVuPSIyMDIyLTAyLTI3VDEzOjU1OjAxLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQzNmVlMjRhLWU2ZTItN2I0MS1iOTNjLThjYTk5ODQwM2U4MCIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0yOFQwOTo0NDo1NC0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWU3NmJjYi01MjMyLTQyNDUtOTg1OC1kYzY2M2I0MzdlMDkiIHN0RXZ0OndoZW49IjIwMjItMDItMjhUMDk6NDQ6NTQtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZDM2ZWUyNGEtZTZlMi03YjQxLWI5M2MtOGNhOTk4NDAzZTgwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIi8+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iTk9URSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iTk9URSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1YzE3NzJkYy01YjYzLTg4NGQtOGFkOS1lODA1NDkwZTdlOGI8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6N2JhOTc0MjgtMTJkOS1mNjQwLWEwN2QtYTExMmRlZDQzY2RjPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjk5MDI1N2FhLWFhOTMtMjU0Mi05MzUzLTMzNjk4Mzc5ZjJjODwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu1cmDUAAB0ESURBVHic7d17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",
    },
    note_long: {
        base: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAADACAYAAAAN6LRnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAR0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA0LTE3VDA5OjQ4OjU5KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAzLTAxVDAyOjI4OjM0LTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMy0wMVQwMjoyODozNC0wNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDVhZWQwMmUtMWIwOS05YzQ1LWIwY2UtY2QwMzkyYzJhNzM3IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzYxNWM2ZjItN2VmYS1jZTQxLWE2Y2MtMzFlNGQ1Y2RkZjYxIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpZUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiBleGlmOkNvbG9yU3BhY2U9IjEiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzODQiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIzODQiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRkMGU2OTJmLTk0ZTctNDA0Mi1hY2NiLTZlNzhhMzBlNTdmYyIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xN1QwOTo0ODo1OSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWI0NzcwZC1iM2ViLWQ1NDMtYmMyYi1lYzg5NjA2MTdjZGUiIHN0RXZ0OndoZW49IjIwMjAtMDQtMTdUMDk6NDk6NTQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2M3MTMxMjYtODczMy05MzQwLTg1ZGMtMmY2YmQyNTJhYjhhIiBzdEV2dDp3aGVuPSIyMDIwLTA5LTI0VDE2OjEwOjMyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc5Y2EyYjFlLWQzMDUtM2U0Zi05OTRkLWQxZTUyNjRlMzc0NSIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0yNFQxNjoxMDozMiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YmM5Y2Q3NC0wNWRmLThmNDAtOTlkMS0wMGZmOTU2ODdjMGUiIHN0RXZ0OndoZW49IjIwMjItMDItMjdUMTM6NTU6MDEtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWUwNWI0NjUtYmRlZi03OTRhLWJkZWMtOWJjZmJmZjlmMGY3IiBzdEV2dDp3aGVuPSIyMDIyLTAyLTI3VDEzOjU1OjAxLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU5M2MwNzc1LTNhY2UtNzg0Zi04ODk4LTljNTJlOTk2ZDNhOCIgc3RFdnQ6d2hlbj0iMjAyMi0wMy0wMVQwMjoyODozNC0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NWFlZDAyZS0xYjA5LTljNDUtYjBjZS1jZDAzOTJjMmE3MzciIHN0RXZ0OndoZW49IjIwMjItMDMtMDFUMDI6Mjg6MzQtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTkzYzA3NzUtM2FjZS03ODRmLTg4OTgtOWM1MmU5OTZkM2E4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIi8+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iTk9URSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iTk9URSIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Ik5PVEUiIHBob3Rvc2hvcDpMYXllclRleHQ9Ik5PVEUiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjVjMTc3MmRjLTViNjMtODg0ZC04YWQ5LWU4MDU0OTBlN2U4YjwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3YmE5NzQyOC0xMmQ5LWY2NDAtYTA3ZC1hMTEyZGVkNDNjZGM8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkwMjU3YWEtYWE5My0yNTQyLTkzNTMtMzM2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bjbwgoCrr3kHV1396xQLRaJo6UU9Figan1KxbciOvz+FPjxnpF8BcCZwyYbV5dEwR/EHwFrS1HLRrkvo5vgBZi/JwiUMw1zfu3jGkIjICWEMzUYD3w+44s1Xc9HO19HMeReAhWKpBLAO+AX6UJ/7FQAXAmeltktYXLo4Q7bef+26cTaesplu1Mk1YWytJQzDI5MyS33vctbtiojk4S2MXmw67TRef+kvMzo2RhQt/ZAwi6VSqrBxLCyTHRq3q+dt7fUFFowAZZum+AU/V6876kacumkLQVDM3UtP05RSqZSrqPftwTEi4paFAAA4/Yyz2PaKM2i3X3rl4qLUWopBQDeJADYDr+xpO+lfAIwDnk3B5LyktSljq9YA+cfojTEEQaDiLiJDYfXatWzZvI00zbffKXtIgIXsucI9P5KgXwFQIttyi5ezOBvjEwTFZT34ZbnDORr+EZFeWZyTrNVqGJuzU2oMmGd3G/SqbYv6eubBcjvmeuqXiJzcsqKXt/5n+leWdeiNiEgPDfM4gwJARMRRCgAREUcpAEREHKUAEBFxlAJARMRRCgAREUcpAEREHKUAEBFxlAJARKRHhv1cMgWAiMgJZozBWkscd3t/oM9xUACIiPSAtTbXc88HSQEgIuIoBYCIiKMUACIijlIAiIg4SgEgIuIoBYCIiKMUACIijlIAiIg4SgEgIuIoBYCIiKMUACIijlIAiIg4SgEgIuIoBYCIiKMUACIijlIAiIg4SgEgIuIoBYCIiKMUACIijlIAiIg4SgEgIuKofgVABKS2TxcTETlpZYUyJaubPdWvALgQGPXM8l6kwBAR15isTq4BdvT6Wv0KgI1nbNtQ7NO1REROWgsBUALGe32tfgVA/H+PH1SHXkQkHwskvb6IJoFFRBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoAERFHKQBERBylABARcZQCQETEUQoA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",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAGACAYAAACkx7W/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAR0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA0LTE3VDA5OjQ4OjU5KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAzLTAxVDAyOjIyOjA1LTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMy0wMVQwMjoyMjowNS0wNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OWE2ZjE1NGYtZjAyMC1hODQyLWFjMjYtOGNiODY5ZWIzOTY2IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjE4NWE1NWQtN2I4Ni00YjQzLWEzNTUtYmMxNjUzNjA0NjU2IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpZUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiBleGlmOkNvbG9yU3BhY2U9IjEiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzODQiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIzODQiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRkMGU2OTJmLTk0ZTctNDA0Mi1hY2NiLTZlNzhhMzBlNTdmYyIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xN1QwOTo0ODo1OSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWI0NzcwZC1iM2ViLWQ1NDMtYmMyYi1lYzg5NjA2MTdjZGUiIHN0RXZ0OndoZW49IjIwMjAtMDQtMTdUMDk6NDk6NTQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2M3MTMxMjYtODczMy05MzQwLTg1ZGMtMmY2YmQyNTJhYjhhIiBzdEV2dDp3aGVuPSIyMDIwLTA5LTI0VDE2OjEwOjMyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc5Y2EyYjFlLWQzMDUtM2U0Zi05OTRkLWQxZTUyNjRlMzc0NSIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0yNFQxNjoxMDozMiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YmM5Y2Q3NC0wNWRmLThmNDAtOTlkMS0wMGZmOTU2ODdjMGUiIHN0RXZ0OndoZW49IjIwMjItMDItMjdUMTM6NTU6MDEtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWUwNWI0NjUtYmRlZi03OTRhLWJkZWMtOWJjZmJmZjlmMGY3IiBzdEV2dDp3aGVuPSIyMDIyLTAyLTI3VDEzOjU1OjAxLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA0NmFiZmI4LThiMGEtY2M0My05ZDFmLWYzMWZhOTRjOWYxOCIgc3RFdnQ6d2hlbj0iMjAyMi0wMy0wMVQwMjoyMjowNS0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5YTZmMTU0Zi1mMDIwLWE4NDItYWMyNi04Y2I4NjllYjM5NjYiIHN0RXZ0OndoZW49IjIwMjItMDMtMDFUMDI6MjI6MDUtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQ2YWJmYjgtOGIwYS1jYzQzLTlkMWYtZjMxZmE5NGM5ZjE4IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIi8+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iTk9URSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iTk9URSIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Ik5PVEUiIHBob3Rvc2hvcDpMYXllclRleHQ9Ik5PVEUiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjVjMTc3MmRjLTViNjMtODg0ZC04YWQ5LWU4MDU0OTBlN2U4YjwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3YmE5NzQyOC0xMmQ5LWY2NDAtYTA3ZC1hMTEyZGVkNDNjZGM8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkwMjU3YWEtYWE5My0yNTQyLTkzNTMtMzM2OTgzNzlmMmM4PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+piV0nwAAKzJJREFUeJzt3XecFdX9//HXzO3bYOlLr0pTwSg2NCLW2At2vyaxJMav/izJV6Pfb3r9mmKKRk00JvpFjAVb1CiiqFiwBlBQRAVB+sL2vW3m98cFgwbZu3fm3rm75/18PFCUe8797N3lvGfOzDljua6LiIiYxw66ABERCYYCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDKQBERAylABARMZQCQETEUAoAERFDhUvxJhMnTvSzOxsIARGgApgCjABqt/6q2PpnxZIFqoE08NbW/2cV8f1EpDy45P7eNwGN5MaCJuBVoBnIbH2d49cbLl682K+udqgkAeCRTa7OEDAUOAAYBewB7N6zpmqI62Zwshlc1wHcoo7GLmBb4FoWGd++zSJS7ixyf/9xAdcihE1zMp0CXgHmA0uA9q3/vWJrE4dcUJSl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uDiuq12HRGQnXDLZ7NbtbCzC0QjRaJSQHSp4+rgtnWLdhvZ2YCbw32y3awLA4sWLPVe9M0FtB70EuH9jU/aMXpWZStzcQ0sK+RAtyyYSjRK1YgWlL6CtkUUkL7Htbxt3c9urFzRuYdGSbqe9JQXwBDCbAHZnDioAFgKXA1Z9i3VurZUKZx2XysrK3LlPAR/otm+CbukUkWLyMmtibf1nc7KVtuYUzUlrEbmj/6eANl8K7IQg739sBs4Hfre52Uql0imamxq3FqRBXES6FwvAsmhMttDWlKQ5ab0BfBO4mwAGfyiPB8J8D7hzS4vdmnEstmyuJ3dRVyEgIt3DtovIm5sbSTakaU7ZTwPfBZ4Msq5yCIAE8DPgG5ubnVWxylo212/abldPBYGIdF2WZdGeTbG2vp4tDW6mOWP9Gfga8BzQI8jayuGZwOu2/loGLF2zofF6iEyOxNKxlpZmampqiESieoi5iHQpNjZpHDY3bMbORmlvDz8JvADcAGwIuDygPAJgey8DJwDf29iQnQ7h0S5NluU61NT0IByN5K68a8WuiJSh3JyFRRqH9c1byDamSBL9CDK3kLv55Skg/71wiqzcAgByZwPfBnoDFze2hU6E0DA73G5lGhtIxOPEYnHC4Vzphd41JCLiB2vrNHXGdUhm0zQ2t+G2ZkkSXgrRh8kd9T9Gbrwtm8EfyjMAILcfxhbgCuA3wImbm52zIbJrn359qrZsqSeTaiQatolGY4TCIWw7lHuUmmUHc9lAISRiBJfc/f+O65J1MzS3pUklM1hZm/a0mwHrYQg/B9STW937NpClRPv7dEZQK4EL0QvYC5gBDAF2BQYNqusTcbNpMpk02Wwa18nmvkOluovIzd2xlMXFxS7Z2xYilVZIiXjhAjguFjYhy6KpPe0CrwL/AN4lt/PxS8AKcoeiDrnBvyDddSVwIerJrZibS67uONB39ZqNpwPDyF1N7wtUA1FyC3xLMeK55J7duQqcVsp7YfG8oAsQ6eLagE3gNJL7ux4BGoBXtv4bcoN+l1CSMwARESk/5bAOQEREAqAAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQCgAREUMpAEREDKUAEBExlAJARMRQ/x+FQ9VMy0ZF3AAAAABJRU5ErkJggg==",
        blueprint: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAADACAYAAAAN6LRnAAAACXBIWXMAAAsTAAALEwEAmpwYAAARhWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA0LTE3VDA5OjQ4OjU5KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAyLTI4VDIzOjEzOjU5LTA2OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0yOFQyMzoxMzo1OS0wNjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDQxYjkxYzEtY2MzOS1kMTQ0LWFiMWQtZWZhZGI1YTg0NTAzIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZWI2NmQyNzUtYjEwNC1lNzRiLWI2N2YtNmNlNzY4OGE5NWFmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpZUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiBleGlmOkNvbG9yU3BhY2U9IjEiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIzODQiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIzODQiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRkMGU2OTJmLTk0ZTctNDA0Mi1hY2NiLTZlNzhhMzBlNTdmYyIgc3RFdnQ6d2hlbj0iMjAyMC0wNC0xN1QwOTo0ODo1OSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWI0NzcwZC1iM2ViLWQ1NDMtYmMyYi1lYzg5NjA2MTdjZGUiIHN0RXZ0OndoZW49IjIwMjAtMDQtMTdUMDk6NDk6NTQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2M3MTMxMjYtODczMy05MzQwLTg1ZGMtMmY2YmQyNTJhYjhhIiBzdEV2dDp3aGVuPSIyMDIwLTA5LTI0VDE2OjEwOjMyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc5Y2EyYjFlLWQzMDUtM2U0Zi05OTRkLWQxZTUyNjRlMzc0NSIgc3RFdnQ6d2hlbj0iMjAyMC0wOS0yNFQxNjoxMDozMiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YmM5Y2Q3NC0wNWRmLThmNDAtOTlkMS0wMGZmOTU2ODdjMGUiIHN0RXZ0OndoZW49IjIwMjItMDItMjdUMTM6NTU6MDEtMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZWUwNWI0NjUtYmRlZi03OTRhLWJkZWMtOWJjZmJmZjlmMGY3IiBzdEV2dDp3aGVuPSIyMDIyLTAyLTI3VDEzOjU1OjAxLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5ZDQ4MTFhLWM3MWQtOGI0Yi05Mzk5LThhZWU1MzhhMzMxOSIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0yOFQyMzoxMzo1OS0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowNDFiOTFjMS1jYzM5LWQxNDQtYWIxZC1lZmFkYjVhODQ1MDMiIHN0RXZ0OndoZW49IjIwMjItMDItMjhUMjM6MTM6NTktMDY6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTlkNDgxMWEtYzcxZC04YjRiLTkzOTktOGFlZTUzOGEzMzE5IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MmY2ZDZjZDktYmQ5YS03YjRlLTkzNzctNTFkMjg1YTkxYWMzIiBzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIi8+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iTk9URSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iTk9URSIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Ik5PVEUiIHBob3Rvc2hvcDpMYXllclRleHQ9Ik5PVEUiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6NWMxNzcyZGMtNWI2My04ODRkLThhZDktZTgwNTQ5MGU3ZThiPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjdiYTk3NDI4LTEyZDktZjY0MC1hMDdkLWExMTJkZWQ0M2NkYzwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5OTAyNTdhYS1hYTkzLTI1NDItOTM1My0zMzY5ODM3OWYyYzg8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRp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",
    },
};