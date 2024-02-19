import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import useDidClickOutside from "../hooks/useDidClickOutside";

export type OptionType = {
    key: string,
    value: string,
}

type PropsType = {
    options: Array<OptionType>,
    onItemSelect?: (values: Array<OptionType>) => void,
}

const Dropdown = ({
    options,
    onItemSelect
}: PropsType) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOptionsDisplay, setIsOptionDisplay] = useState(false);
    useDidClickOutside(() => setIsOptionDisplay(false), [ref]);
    const [masterOptions, setMasterOptions] = useState(options); 
    const [selectedItems, setSelectedItems] = useState<Array<OptionType>>([]);
    const [inputTypedText, setInputTypedText] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addSelectedItems = (item: OptionType) => {
        const index = selectedItems.findIndex((f) => f.key === item.key);
        if (index === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const tempArr = [...selectedItems];
            tempArr.splice(index, 1);
            setSelectedItems(tempArr);
        }
    }

    const onAddItem = (value: string) => {
        const index = selectedItems.findIndex((f) => f.value.toLowerCase() === value?.toLowerCase());
        if (index === -1) {
            setMasterOptions([{ key: value, value }, ...masterOptions]);
            setInputTypedText("");
        }
    }

    useEffect(() => {
        onItemSelect && onItemSelect(selectedItems);
    }, [selectedItems, onItemSelect]);

    return (
        <div 
            ref={ref} 
            className={styles["dropdown-wrapper"]}
        >
            <div className={styles["input-wrapper"]}>
                <input
                    ref={inputRef}
                    className={`${styles.input}`}
                    value={isInputFocused ? inputTypedText: selectedItems.map((item) => item.value).join(", ")}
                    onFocus={() => {
                        setIsInputFocused(true);
                        setIsOptionDisplay(true);
                    }}
                    onBlur={() => setIsInputFocused(false)}
                    onChange={(e) => {
                        if (isInputFocused) {
                            setInputTypedText(e.target.value);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && inputTypedText) {
                            onAddItem(inputTypedText)
                        }
                    }}
                />
                {isOptionsDisplay ?
                    <i className={`${styles.chevron} ${styles["chevron-up"]}`} />
                    : <i className={`${styles.chevron} ${styles["chevron-down"]}`} />
                }
            </div>
            {/* <i className={`${styles.chevron} ${styles["chevron-up"]}`} />
            <i className={`${styles.chevron} ${styles["chevron-down"]}`} /> */}
            {isOptionsDisplay &&
                <div className={`${styles["options-list-wrapper"]} ${isOptionsDisplay ? styles.visible: ``}`}>
                    <ul className={`${styles["options-list"]}`}>
                        {masterOptions.map((item) => {
                            const isSelected = selectedItems.findIndex((f) => f.key === item.key) !== -1;
                            return (
                                <li
                                    key={item.key} 
                                    onClick={() => addSelectedItems(item)}
                                    className={`${styles["list-item"]} ${isSelected ? styles.selected: ``}`}
                                >
                                    <span>
                                        {item.value}
                                    </span>
                                    {isSelected ? <span>&#10004;</span> : ``}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    )
};

export default Dropdown;
