import React, { useState } from 'react';
import { DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/button";

export const ClearDialog = ({ setOpen }: any) => (
	<DialogPortal>
		<DialogOverlay asChild />
		<DialogContent className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
			<div className="bg-black p-6 rounded-lg shadow-lg">
				<DialogTitle className="text-lg font-bold">Are you sure?</DialogTitle>
				<DialogDescription className="text-sm">
					This action will clear the graph. Do you want to proceed?
				</DialogDescription>
				<div className="mt-4 flex justify-end space-x-2">
					<DialogClose asChild>
						<Button onClick={() => setOpen(false)} variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button variant="destructive" onClick={() => {
						// Add your clear graph logic here
						setOpen(false);
					}}>
						Confirm
					</Button>
				</div>
			</div>
		</DialogContent>
	</DialogPortal>
);
