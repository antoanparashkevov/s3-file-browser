import React from "react";
import styles from './Dropdown.module.scss';

export interface dropdownItem {
    name: string,
    code: string
}

interface DropdownInterface {
    dropdownItems: dropdownItem[],
    onSelectedItem: (selectedData: dropdownItem) => void
}

const Dropdown: React.FC<DropdownInterface> = (
    {dropdownItems, onSelectedItem}
) => {
    
    const handleDropdownItemClick = (selectedData: dropdownItem) => {
        if(selectedData && selectedData.name && selectedData.code) {
            onSelectedItem(selectedData);
        }
    }
    
    return (
        <ul className={styles['dropdown_list']} role='list'>
            {dropdownItems.map(item => 
               <li 
                   className={styles['dropdown_item']}
                   key={item.code} 
                   onClick={handleDropdownItemClick.bind(this,{name: item.name, code: item.code})}
               >
                   {item.name}
               </li>
            )}
        </ul>
    )
}

export default Dropdown;