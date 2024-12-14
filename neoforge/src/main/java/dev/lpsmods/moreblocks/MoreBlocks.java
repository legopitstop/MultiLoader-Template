package dev.lpsmods.moreblocks;


import net.neoforged.bus.api.IEventBus;
import net.neoforged.fml.common.Mod;

@Mod(Constants.MOD_ID)
public class MoreBlocks {

    public MoreBlocks(IEventBus eventBus) {
        Bootstrap.init();

    }
}