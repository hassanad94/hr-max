import type { ClassValue } from "clsx";
import type { ComponentProps, FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type HrInputProps = ComponentProps<typeof Input> & {
	label: string;
	className?: ClassValue;
};

export const HrInput: FC<HrInputProps> = ({
	label,
	className,
	id,
	...inputProps
}) => {
	return (
		<div className={cn("grid w-full max-w-sm items-center gap-3", className)}>
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} {...inputProps} />
		</div>
	);
};
