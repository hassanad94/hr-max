import { ChevronDownIcon, ChevronRightIcon, LanguagesIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import LanguageDropdown from "@/components/shadcn-studio/blocks/dropdown-language";
import ProfileDropdown from "@/components/shadcn-studio/blocks/dropdown-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { sidebarMenu } from "@/config/sidebar-menu";

type Props = {
	children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
	const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

	const toggleItem = (id: string) => {
		setOpenItems((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const getBadgeStyles = (variant?: "new" | "beta") => {
		switch (variant) {
			case "new":
				return "bg-green-500 text-white";
			case "beta":
				return "bg-yellow-500 text-white";
			default:
				return "bg-green-500 text-white";
		}
	};

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
										{section.items.map((item) => {
											const Icon = item.icon;
											const isOpen = openItems[item.id];

											return (
												<SidebarMenuItem key={item.id}>
													<SidebarMenuButton
														onClick={
															item.collapsible
																? () => toggleItem(item.id)
																: undefined
														}
														className="w-full justify-between"
													>
														<div className="flex items-center gap-3">
															<Icon className="size-5" />
															<span>{item.label}</span>
														</div>
														<div className="flex items-center gap-2">
															{item.badge && (
																<span
																	className={`rounded px-1.5 py-0.5 text-xs font-medium ${getBadgeStyles(item.badge.variant)}`}
																>
																	{item.badge.text}
																</span>
															)}
															{item.collapsible &&
																(isOpen ? (
																	<ChevronDownIcon className="size-4" />
																) : (
																	<ChevronRightIcon className="size-4" />
																))}
														</div>
													</SidebarMenuButton>
													{item.subItems && isOpen && (
														<SidebarMenuSub>
															{item.subItems.map((subItem) => (
																<SidebarMenuSubItem key={subItem.label}>
																	<SidebarMenuSubButton href={subItem.href}>
																		{subItem.label}
																	</SidebarMenuSubButton>
																</SidebarMenuSubItem>
															))}
														</SidebarMenuSub>
													)}
												</SidebarMenuItem>
											);
										})}
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
								<Breadcrumb className="hidden sm:block">
									<BreadcrumbList>
										<BreadcrumbItem>
											<BreadcrumbLink href="#">Home</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbPage>Employees</BreadcrumbPage>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
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

export default AuthLayout;
