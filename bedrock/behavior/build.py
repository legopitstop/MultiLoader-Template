"""
Generates common files like loot tables, and recipes.
"""
from mcaddon import LootTable, ShapelessRecipe, ShapedRecipe, ItemStack, LootPool, ItemEntry, SetCountLootFunction, LootNumberProvider, Identifier
import glob
import json
import os

def mk(pathname:str):
    os.makedirs(os.path.dirname(pathname), exist_ok=True)
    return pathname

def to_item(id:str):
    """
    Convert custom id to a Minecraft ingredient item.
    """
    id = str(id)
    var1 = id.replace('_layer', '').replace('_vertical_slab','').replace('_slab', '').replace('_stairs','').replace('brick', 'bricks').replace('tile', 'tiles').replace('tiless', 'tiles')
    match var1:
        case 'acacia'|'pale_oak'|'oak'|'dark_oak'|'warped'|'crimson'|'spruce'|'birch'|'mangrove'|'cherry'|'jungle':
            return var1+'_planks'
        case 'rooted_dirt':
            return 'dirt_with_roots'
        case 'pale_moss':
            return 'pale_moss_block'
        case 'moss':
            return 'moss_block'
        case 'magma_block':
            return 'magma'
        case 'copper':
            return 'copper_block'
        case 'terracotta':
            return 'hardened_clay'
        case 'slime_block': return 'slime'
        case 'nether_bricks_block': return 'nether_brick'
        case 'nether_bricks': return 'nether_brick'
        case 'clay_block': return 'clay'
        case 'bricks_block': return 'brick_block'
        case 'bricks': return 'brick_block'
        case 'smooth_quartz_block': return 'smooth_quartz'
        case 'red_nether_bricks': return 'red_nether_brick'
        case 'nether_quartz_ore': return 'quartz_ore'
        case 'end_stone_bricks': return 'end_bricks'
        case 'dirt_path': return 'grass_path'
        case 'light_gray_glazed_terracotta': return 'silver_glazed_terracotta'
        case 'flowering_azalea_leaves': return 'azalea_leaves_flowered'
        case 'powder_snow': return 'powder_snow_bucket'
    return var1

def fix_data(data):
    """
    Remove "count" from ingredients. Will be fixed in the next mcaddon release.
    """
    if 'minecraft:recipe_shapeless' in data:
        if 'ingredients' in data['minecraft:recipe_shapeless']:
            for ing in data['minecraft:recipe_shapeless']['ingredients']:
                if 'count' in ing:
                    del ing['count']

                # Add data=0 to sandstone and red_sandstone
                if ing['item'] == 'minecraft:sandstone' or ing['item'] == 'minecraft:red_sandstone':
                    ing['data'] = 0
    if 'minecraft:recipe_shaped' in data:
        if 'key' in data['minecraft:recipe_shaped']:
            for ing in data['minecraft:recipe_shaped']['key'].values():
                if ing['item'] == 'minecraft:sandstone' or ing['item'] == 'minecraft:red_sandstone':
                    ing['data'] = 0


def save(data:dict, fp:str):
    """
    Save JSON data
    """
    fix_data(data)
    with open(mk(fp), 'w') as fd:
        fd.write(json.dumps(data, indent=4))

# LAYERS
for fn in glob.glob('blocks/layer/*.json'):
    print(fn)
    with open(fn) as fd:
        layer = json.load(fd)['minecraft:block']
    ID = Identifier.of(layer['description']['identifier'])

    # Layer Loot Tables
    for x in range(1,8):
        loot = LootTable(pools=[])
        pool = LootPool(1, entries=[])
        entry = ItemEntry(ID, 1, 1, [], [])
        entry.add_function(SetCountLootFunction(LootNumberProvider(x)))
        pool.add_entry(entry)
        loot.add_pool(pool)
        loot.save(os.path.join('loot_tables', 'blocks', ID.path+str(x)+'.json'), True)

    # Layer Recipes
    ing = ItemStack(to_item(ID.path))
    recipe = ShapelessRecipe(ID+"_stonecutting", ItemStack(ID, 8))
    recipe.clear_tags()
    recipe.add_tag('stonecutter')
    recipe.add_ingredient(ing)
    data = recipe.jsonify()
    data['minecraft:recipe_shapeless']['unlock'] = [{'item':ing.jsonify()['item']}]

    fp = os.path.join('recipes', 'layer', f'{ ID.path }_stonecutting.json')
    save(data, fp)
    

# SLAB
for fn in glob.glob('blocks/slab/*.json'):
    print(fn)
    with open(fn) as fd:
        slab = json.load(fd)['minecraft:block']
    ID = Identifier.of(slab['description']['identifier'])
    
    # Slab Loot Tables
    loot = LootTable(pools=[])
    pool = LootPool(1, entries=[])
    entry = ItemEntry(ID, 1, 1, [], [])
    entry.add_function(SetCountLootFunction(LootNumberProvider(2)))
    pool.add_entry(entry)
    loot.add_pool(pool)
    loot.save(os.path.join('loot_tables', 'blocks', ID.path.replace('_slab', '_double_slab')+'.json'), True)

    # Slab Recipes
    ing = ItemStack(to_item(ID.path))
    recipe = ShapelessRecipe(ID+"_stonecutting", ItemStack(ID, 2))
    recipe.clear_tags()
    recipe.add_tag('stonecutter')
    recipe.add_ingredient(ing)
    data = recipe.jsonify()
    data['minecraft:recipe_shapeless']['unlock'] = [{'item':ing.jsonify()['item']}]

    fp = os.path.join('recipes', 'slab', f'{ ID.path }_stonecutting.json')
    save(data, fp)

    recipe = ShapedRecipe(ID, ItemStack(ID, 2), ['###'])
    recipe.clear_tags()
    recipe.add_tag('crafting_table')
    recipe.add_key('#', ing)
    data = recipe.jsonify()
    data['minecraft:recipe_shaped']['unlock'] = [{'item':ing.jsonify()['item']}]
    fp = os.path.join('recipes', 'slab', f'{ ID.path }.json')
    save(data, fp)

## STAIRS
for fn in glob.glob('blocks/stairs/*.json'):
    print(fn)
    with open(fn) as fd:
        slab = json.load(fd)['minecraft:block']
    ID = Identifier.of(slab['description']['identifier'])
    
    # Stairs Recipes
    ing = ItemStack(to_item(ID.path))
    recipe = ShapelessRecipe(ID+"_stonecutting", ItemStack(ID))
    recipe.clear_tags()
    recipe.add_tag('stonecutter')
    recipe.add_ingredient(ing)
    data = recipe.jsonify()
    data['minecraft:recipe_shapeless']['unlock'] = [{'item':ing.jsonify()['item']}]

    fp = os.path.join('recipes', 'stairs', f'{ ID.path }_stonecutting.json')
    save(data, fp)

    recipe = ShapedRecipe(ID, ItemStack(ID, 4), ['#','##','###'])
    recipe.clear_tags()
    recipe.add_tag('crafting_table')
    recipe.add_key('#', ing)
    data = recipe.jsonify()
    data['minecraft:recipe_shaped']['unlock'] = [{'item':ing.jsonify()['item']}]
    fp = os.path.join('recipes', 'stairs', f'{ ID.path }.json')
    save(data, fp)

## VERTICAL SLAB
for fn in glob.glob('blocks/vertical_slab/*.json'):
    print(fn)
    with open(fn) as fd:
        vertical_slab = json.load(fd)['minecraft:block']
    ID = Identifier.of(vertical_slab['description']['identifier'])

    # Vertical Slab Loot Tables
    loot = LootTable(pools=[])
    pool = LootPool(1, entries=[])
    entry = ItemEntry(ID, 1, 1, [], [])
    entry.add_function(SetCountLootFunction(LootNumberProvider(2)))
    pool.add_entry(entry)
    loot.add_pool(pool)
    loot.save(os.path.join('loot_tables', 'blocks', ID.path.replace('_vertical_slab', '_double_vertical_slab')+'.json'), True)
    
    # Vertical Slab Recipes
    ing = ItemStack(to_item(ID.path))
    recipe = ShapelessRecipe(ID+"_stonecutting", ItemStack(ID, 2))
    recipe.clear_tags()
    recipe.add_tag('stonecutter')
    recipe.add_ingredient(ing)
    data = recipe.jsonify()
    data['minecraft:recipe_shapeless']['unlock'] = [{'item':ing.jsonify()['item']}]

    fp = os.path.join('recipes', 'vertical_slab', f'{ ID.path }_stonecutting.json')
    save(data, fp)

    ing = ItemStack(to_item(ID.path))
    recipe = ShapedRecipe(ID, ItemStack(ID, 6), ['#','#','#'])
    recipe.clear_tags()
    recipe.add_tag('crafting_table')
    recipe.add_key('#', ing)
    data = recipe.jsonify()
    data['minecraft:recipe_shaped']['unlock'] = [{'item':ing.jsonify()['item']}]
    fp = os.path.join('recipes', 'vertical_slab', f'{ ID.path }.json')
    save(data, fp)
