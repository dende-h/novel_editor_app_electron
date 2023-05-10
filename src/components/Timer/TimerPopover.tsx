/* eslint-disable react/display-name */
import {
	Popover,
	PopoverTrigger,
	Portal,
	PopoverContent,
	PopoverBody,
	PopoverFooter,
	IconButton,
	useDisclosure,
	useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import { RiTimerFill } from "react-icons/ri";
import { PomodoroTimer } from "./PomodoroTimer";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export const TimerPopover = React.forwardRef<HTMLDivElement>((props, ref) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const bg = useColorModeValue("gray.300", "gray.700");
	const bgFooter = useColorModeValue("gray.100", "gray.900");

	return (
		<Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="right-start" closeOnBlur={false}>
			<PopoverTrigger>
				<IconButton
					as={"button"}
					aria-label="PomodoroTimer"
					icon={<RiTimerFill />}
					variant="ghost"
					colorScheme={"twitter"}
					fontSize="24px"
					boxSize={10}
				/>
			</PopoverTrigger>

			<Portal>
				<PopoverContent>
					<PopoverBody background={bg}>
						<PomodoroTimer />
					</PopoverBody>
					<PopoverFooter background={bgFooter}>
						<IconButton
							aria-label="close"
							icon={<IoIosArrowDropleftCircle />}
							variant="ghost"
							colorScheme={"twitter"}
							fontSize="24px"
							boxSize={10}
							onClick={onClose}
						/>
					</PopoverFooter>
				</PopoverContent>
			</Portal>
		</Popover>
	);
});
