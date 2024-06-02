import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { SyntheticEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type TArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: TArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: open,
		rootRef: rootRef,
		onClose: () => {
			open === false ? setOpen(true) : setOpen(false);
		},
		onChange: setOpen,
		eventName: 'mousedown',
	});
	const [newFontColor, setNewFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	);
	const [newFontSize, setNewFontSize] = useState<OptionType>(
		currentArticleState.fontSizeOption
	);
	const [newFontFamily, setNewFontFamily] = useState<OptionType>(
		currentArticleState.fontFamilyOption
	);
	const [newBackgroundColor, setNewBackgroundColor] = useState<OptionType>(
		currentArticleState.backgroundColor
	);
	const [newContentWidth, setNewContentWidth] = useState<OptionType>(
		currentArticleState.contentWidth
	);
	const submitHandler = (evt: SyntheticEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setCurrentArticleState({
			fontFamilyOption: newFontFamily,
			fontSizeOption: newFontSize,
			fontColor: newFontColor,
			backgroundColor: newBackgroundColor,
			contentWidth: newContentWidth,
		});
	};
	const resetHandler = (evt: SyntheticEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setNewFontColor(defaultArticleState.fontColor);
		setNewFontSize(defaultArticleState.fontSizeOption);
		setNewFontFamily(defaultArticleState.fontFamilyOption);
		setNewBackgroundColor(defaultArticleState.backgroundColor);
		setNewContentWidth(defaultArticleState.contentWidth);
		setCurrentArticleState(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={open}
				handlerClick={() => (open === false ? setOpen(true) : setOpen(false))}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form
					onSubmit={submitHandler}
					onReset={resetHandler}
					className={styles.form}>
					<Select
						options={fontFamilyOptions}
						placeholder={newFontFamily.value}
						selected={newFontFamily}
						onChange={setNewFontFamily}
						title='шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={newFontSize}
						onChange={setNewFontSize}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						placeholder={newFontColor.value}
						selected={newFontColor}
						onChange={setNewFontColor}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						placeholder={newBackgroundColor.value}
						selected={newBackgroundColor}
						onChange={setNewBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder={newContentWidth.value}
						selected={newContentWidth}
						onChange={setNewContentWidth}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
