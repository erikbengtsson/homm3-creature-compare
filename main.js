// function CreatureCompare(container, creatures) {
//     this.container = container;
//     this.cr1holder = this.container.find($('#cr1'));
//     this.cr2holder = this.container.find($('#cr2'));
//     this.crArray = creatures.results.creature;

//     console.dir(this.crArray);
// }

// CreatureCompare.prototype.getTowns = function() {
//     var towns = new Array();

//     $.each(this.crArray, function(ind, obj) {
//         towns[ind] = obj.town.text;
//     });
//     return towns;
// }
// var creacom = new CreatureCompare($('#comparison'), creatures);
// console.dir(creacom.getTowns());


// $(this).parent()

(function() {

    $(".townselect").on("change", function() {
        listCreatures(this.value, $(this).parent());
    });

    $(".creatureselect").on("change", function() {
        var config = {
            container: $(this).parent(),
            template: $('#template')
        },
            crNum = parseInt(this.value),
            quantity = ($(this).parent().find(".quantity").val()) ? parseInt($(this).parent().find(".quantity").val()) : 1;
        showCreature(config, crNum, quantity);
    });

    $(".quantity").on("keyup", function() {
        if ($(this).parent().find($(".creatureselect")).val() && this.value) {
            var config = {
                container: $(this).parent(),
                template: $('#template')
            },
                crNum = $(this).parent().find(".creatureselect").val(),
                quantity = parseInt(this.value);
            showCreature(config, crNum, quantity);
        }
    });

})();


listCreatures = function(town, self) {
    var cr = creatures.results.creature,
        insert = self.find($(".creatureselect"));

    insert.html("");
    var html = "<option disabled selected>Creature</option>";

    for (i = 0; i < cr.length; i++) {
        if (cr[i].town.text === town) {
            html += "<option value='" + i + "'>" + cr[i].name.text + "</option>";

        }
    };
    insert.append(html);
}

showCreature = function(config, crNum, quant) {
    var cr = creatures.results.creature,
        crNumber = crNum,
        thisCr = cr[crNumber],
        self = this,
        container = config.container,
        template = config.template;

    var context = {

        name: (quant != 1) ? thisCr.name.text + " x " + quant : thisCr.name.text,
        hp: thisCr.hp * quant,
        attack: parseInt(thisCr.attack),
        defense: parseInt(thisCr.defense),
        speed: parseInt(thisCr.speed),
        minDamage: parseInt(thisCr.damage_min) * quant,
        maxDamage: parseInt(thisCr.damage_max) * quant,
        costGold: parseInt(thisCr.cost_gold.text) * quant,
        special: (thisCr.special.text) ? thisCr.special.text : "None",
    }

    var template = Handlebars.compile(template.html());
    var html = template(context);

    container.find($('.info')).html(html);


}