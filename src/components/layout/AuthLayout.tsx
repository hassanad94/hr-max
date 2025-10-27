import { LanguagesIcon } from "lucide-react";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SidebarMenuItem as SidebarMenuItemComponent } from "@/components/layout/SidebarMenuItem";
import LanguageDropdown from "@/components/shadcn-studio/blocks/dropdown-language";
import ProfileDropdown from "@/components/shadcn-studio/blocks/dropdown-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { sidebarMenu } from "@/config/sidebar-menu";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex min-h-dvh w-full">
			<SidebarProvider>
				<Sidebar>
					<SidebarHeader className="border-b px-4 py-3">
						<div className="flex items-center gap-2">
							<div className="flex size-10 items-center justify-center rounded-lg bg-primary">
								<span className="text-xl font-bold text-primary-foreground">
									HR
								</span>
							</div>
							<span className="text-xl font-bold">Admin</span>
						</div>
					</SidebarHeader>
					<SidebarContent>
						{sidebarMenu.map((section) => (
							<SidebarGroup key={section.label}>
								<SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase text-muted-foreground">
									{section.label}
								</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										{section.items.map((item) => (
											<SidebarMenuItemComponent key={item.id} item={item} />
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						))}
					</SidebarContent>
				</Sidebar>
				<div className="flex flex-1 flex-col">
					<header className="bg-card sticky top-0 z-50 border-b">
						<div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
							<div className="flex items-center gap-4">
								<SidebarTrigger className="[&_svg]:!size-5" />
								<Separator
									orientation="vertical"
									className="hidden !h-4 sm:block"
								/>
								<Breadcrumbs />
							</div>
							<div className="flex items-center gap-1.5">
								<LanguageDropdown
									trigger={
										<Button variant="ghost" size="icon">
											<LanguagesIcon />
										</Button>
									}
								/>
								<ProfileDropdown
									trigger={
										<Button variant="ghost" size="icon" className="size-9.5">
											<Avatar className="size-9.5 rounded-md">
												<AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
												<AvatarFallback>JD</AvatarFallback>
											</Avatar>
										</Button>
									}
								/>
							</div>
						</div>
					</header>
					<main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
						{children}
					</main>
				</div>
			</SidebarProvider>
		</div>
	);
};
