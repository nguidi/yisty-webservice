const assert = require("assert").strict;
const scan = require("../src/middleware/scan");

describe("Funciones de escaneo de un producto", () => {
    it("Función: mergeMultiLineIngredient", async() => {
        assert.equal(
            scan.mergeMultiLineIngredient("goma\n     xantica"),
            "goma xantica"
        );
    });

    it("Función: removeDescription", async() => {
        assert.equal(
            scan.removeDescription("EMU: lecitina de soja"),
            "lecitina de soja"
        );
    });

    it("Función: removeExtraInformation", async() => {
        let str = "rojo carmin. contiene gluten de";
        assert.equal(scan.removeExtraInformation(str), "rojo carmin");
    });

    it("Función: removeExtraInformation", async() => {
        let str = "Riboflavina (82) 13 mg/kg";
        assert.equal(scan.removeExtraInformation(str), "Riboflavina");
    });

    it("Función: removeExtraInformation", async() => {
        let str = "acido folico 22 mg/kg";
        assert.equal(scan.removeExtraInformation(str), "acido folico");
    });

    it("Función: splitIngredients", async() => {
        let ingredients = `GALLETITAS DULCES CON RELLENO SA
        FRAMBUESA - Ingredientes: Harina de trigo enríquá£lf
        por ley 25.630 (hierro 30 mg/kg, ácido fólico 22 mg/kg,
        Tiamina (81) 6.3 mg/kg, Riboflavina (82) 13 mg/kg,
        Niacina (83) 13.0 mg/kg), Jarabe de maíz de alta fructosa,
        azúcar, oleomargarina, sal, ESP: carragenina, goma
        xántica, RAI: Bicarbonato de sodio, Bicarbonato de amonio,
        EMU: Lecitina de soja, ARO: Aromatizante artificial sabor
        frambuesa, COL: Rojo Carmín. CONTIENE GLUTEN DE`;

        expected = [
            "harina de trigo enríquá£lf por ley",
            "ácido fólico",
            "tiamina",
            "riboflavina",
            "niacina",
            "jarabe de maíz de alta fructosa",
            "azúcar",
            "oleomargarina",
            "sal",
            "carragenina",
            "goma xántica",
            "bicarbonato de sodio",
            "bicarbonato de amonio",
            "lecitina de soja",
            "aromatizante artificial sabor frambuesa",
            "rojo carmín",
        ];
        assert.deepEqual(expected, scan.splitIngredients(ingredients));
    });
});
