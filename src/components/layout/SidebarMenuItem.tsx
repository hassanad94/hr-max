import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { type FC, useState } from "react";
import {
	SidebarMenuButton,
	SidebarMenuItem as SidebarMenuItemUI,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { MenuItem } from "@/config/sidebar-menu";

type SideBarMenuProps = {
	item: MenuItem;
};

export const SidebarMenuItem: FC<SideBarMenuProps> = ({ item }) => {
	const [isOpen, setIsOpen] = useState(false);
	const Icon = item.icon;

	const getBadgeStyles = (variant?: "new" | "pro" | "beta") => {
		switch (variant) {
			case "new":
				return "bg-green-500 text-white";
			case "pro":
				return "bg-blue-500 text-white";
			case "beta":
				return "bg-yellow-500 text-white";
			default:
				return "bg-green-500 text-white";
		}
	};

	return (
		<SidebarMenuItemUI key={item.id}>
			<SidebarMenuButton
				onClick={item.collapsible ? () => setIsOpen(!isOpen) : undefined}
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
			{/* TODO: It Should bee a separate component too */}
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
		</SidebarMenuItemUI>
	);
};
