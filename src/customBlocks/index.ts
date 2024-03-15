import Blockly from 'blockly';

Blockly.Blocks['round_with_digits'] = {
    init: function () {
        this.appendValueInput("target")
            .setCheck("Number")
            .appendField("Reduzir o número de casas decimais em ");
        this.appendDummyInput()
            .appendField("com")
            .appendField(new Blockly.FieldNumber(0, 0, 10), "float_point")
            .appendField(" dígitos");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript['round_with_digits'] = function (block: any, generator: any = Blockly.JavaScript) {
    let value_target = generator.valueToCode(block, 'target', Blockly.JavaScript.ORDER_ATOMIC);
    console.log(block)
    let number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ?  '0' : value_target;
    // Montar o código para realizar o arredondamento com os dígitos especificados
    let code = 'Number(' + value_target  + '.toFixed(' + number_float_point + '))';

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.Python['round_with_digits'] = function (block: any, generator: any = Blockly.Python) {
    var value_target = Blockly.Python.valueToCode(block, 'target', Blockly.Python.ORDER_ATOMIC);
    var number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ?  '0' : value_target;
    var code = 'round(' + value_target  + ', ' + number_float_point + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.PHP['round_with_digits'] = function (block: any, generator: any = Blockly.PHP) {
    var value_target = Blockly.PHP.valueToCode(block, 'target', Blockly.PHP.ORDER_ATOMIC);
    var number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ?  '0' : value_target;
    var code = 'round(' + value_target + ', ' + number_float_point + ')';
    
    return [code, Blockly.PHP.ORDER_FUNCTION_CALL];
};

Blockly.Lua['round_with_digits'] = function (block: any, generator: any = Blockly.Lua) {
    var value_target = Blockly.Lua.valueToCode(block, 'target', Blockly.Lua.ORDER_ATOMIC);
    var number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ?  '0' : value_target;
    var code = 'math.round(' + value_target + ', ' + number_float_point + ')';
    
    return [code, Blockly.Lua.ORDER_FUNCTION_CALL];
};

Blockly.Dart['round_with_digits'] = function(block : any, generator = Blockly.Dart) {
    var value_target = Blockly.Dart.valueToCode(block, 'target', Blockly.Dart.ORDER_ATOMIC);
    var number_float_point = block.getFieldValue('float_point');
    value_target = value_target === '' ?  '0' : value_target;
    var code = 'num.parse(' + value_target + '.toStringAsFixed(' + number_float_point + '))';
    
    return [code, Blockly.Dart.ORDER_FUNCTION_CALL];
  };