import type { DialogProps } from "@radix-ui/react-dialog";
import { create } from "zustand";
import type { HandleEmployeeDialogProps } from "@/components/dialogs/HandleEmployeeDialog";

export type DialogWithProps = {
	name: "HandleEmployeeDialog";
	props: HandleEmployeeDialogProps;
} & { dialogProps?: Partial<DialogProps> };

type DialogActions = {
	openDialog: (dialog: DialogWithProps) => void;
	closeLastDialog: () => void;
	closeAllDialogs: () => void;
};

type DialogStore = {
	dialogs: DialogWithProps[];
	actions: DialogActions;
};

export const useDialogStore = create<DialogStore>((set) => ({
	dialogs: [],
	actions: {
		openDialog: (dialog) =>
			set((state) => ({
				dialogs: [...state.dialogs, dialog],
			})),
		closeLastDialog: () =>
			set((state) => ({
				dialogs: state.dialogs.slice(0, -1),
			})),
		closeAllDialogs: () =>
			set(() => ({
				dialogs: [],
			})),
	},
}));

export const useDialogs = () => useDialogStore((state) => state.dialogs);

export const useDialogActions = () => useDialogStore((state) => state.actions);
