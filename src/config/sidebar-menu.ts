import type { LucideIcon } from "lucide-react";
import {
	BotIcon,
	CalendarIcon,
	ClipboardIcon,
	FileIcon,
	FileTextIcon,
	HelpCircleIcon,
	LayoutDashboardIcon,
	MessageCircleIcon,
	TableIcon,
	UserIcon,
} from "lucide-react";

export type MenuSubItem = {
	label: string;
	href?: string;
};

export type MenuItem = {
	id: string;
	label: string;
	icon: LucideIcon;
	href?: string;
	badge?: {
		text: string;
		variant?: "new" | "pro" | "beta";
	};
	collapsible?: boolean;
	defaultOpen?: boolean;
	subItems?: MenuSubItem[];
};

export type MenuSection = {
	label: string;
	items: MenuItem[];
};

export const sidebarMenu: MenuSection[] = [
	{
		label: "MENU",
		items: [
			{
				id: "dashboard",
				label: "Dashboard",
				icon: LayoutDashboardIcon,
				href: "/dashboard",
			},
			{
				id: "ai-assistant",
				label: "AI Assistant",
				icon: BotIcon,
				href: "#",
				badge: {
					text: "NEW",
					variant: "new",
				},
			},
			{
				id: "calendar",
				label: "Calendar",
				icon: CalendarIcon,
				href: "#",
				badge: {
					text: "BETA",
					variant: "beta",
				},
			},
			{
				id: "user-profile",
				label: "User Profile",
				icon: UserIcon,
				href: "#",
			},
			{
				id: "task",
				label: "Task",
				icon: ClipboardIcon,
				collapsible: true,
				defaultOpen: false,
				badge: {
					text: "BETA",
					variant: "beta",
				},
				subItems: [
					{
						label: "All Tasks",
						href: "#",
					},
					{
						label: "My Tasks",
						href: "#",
					},
					{
						label: "Team Tasks",
						href: "#",
					},
					{
						label: "Completed",
						href: "#",
					},
					{
						label: "Archived",
						href: "#",
					},
				],
			},
			{
				id: "forms",
				label: "Forms",
				icon: FileTextIcon,
				href: "#",
				badge: {
					text: "BETA",
					variant: "beta",
				},
			},
			{
				id: "tables",
				label: "Tables",
				icon: TableIcon,
				href: "#",
			},
			{
				id: "pages",
				label: "Pages",
				icon: FileIcon,
				href: "#",
			},
		],
	},
	{
		label: "SUPPORT",
		items: [
			{
				id: "chat",
				label: "Chat",
				icon: MessageCircleIcon,
				href: "#",
			},
			{
				id: "support-tickbox",
				label: "Support Tickbox",
				icon: HelpCircleIcon,
				href: "#",
				badge: {
					text: "NEW",
					variant: "new",
				},
			},
		],
	},
];
