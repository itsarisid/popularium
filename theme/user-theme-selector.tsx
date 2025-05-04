import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { DEFAULT_THEMES, MONO_THEMES, SCALED_THEMES } from "@/data/themes";
import { useThemeConfig } from "@/provider/active-theme";
import { Paintbrush2Icon, PaintBucketIcon, PaintRoller, Palette } from "lucide-react";

export function UserThemeSelector() {
    const { activeTheme, setActiveTheme } = useThemeConfig();
    
    return (<DropdownMenuSub>
        <DropdownMenuSubTrigger>
            <Palette className="me-2 h-4 w-4 stroke-1" />
            Themes {activeTheme}
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
            <DropdownMenuSubContent>
                {DEFAULT_THEMES.map((theme) => (
                    <DropdownMenuItem key={theme.name} onSelect={()=>setActiveTheme(theme.value)}>
                        <PaintRoller className="me-2 h-4 w-4 stroke-1" />
                        {theme.name}
                    </DropdownMenuItem>))}
                <DropdownMenuSeparator />
                {SCALED_THEMES.map((theme) => (
                    <DropdownMenuItem key={theme.name} onSelect={()=>setActiveTheme(theme.value)}>
                        <PaintBucketIcon className="me-2 h-4 w-4 stroke-1" />
                        {theme.name}
                    </DropdownMenuItem>))}
                <DropdownMenuSeparator />
                {MONO_THEMES.map((theme) => (
                    <DropdownMenuItem key={theme.name} onSelect={()=>setActiveTheme(theme.value)}>
                        <Paintbrush2Icon className="me-2 h-4 w-4 stroke-1" />
                        {theme.name}
                    </DropdownMenuItem>))}
            </DropdownMenuSubContent>
        </DropdownMenuPortal>
    </DropdownMenuSub>)
}