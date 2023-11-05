import React, { Fragment } from "react";
import styles from './CurrentDirectoryView.module.scss';
import classNames from "classnames/bind";

//currDir
import CurrentDirectoryViewItem from "./CurrentDirectoryViewItem";
import useFetchObjects from "../../hooks/use-fetch-objects";
import getCurrDirectoryView from "../../util/getCurrDirectoryView";

//redux
import { useSelector } from "react-redux";
import { State } from "../../store";

//UI components
import BaseDialog from "../UI/BaseDialog";

const cx = classNames.bind(styles)

const CurrentDirectoryView: React.FC = () => {
    const awsState = useSelector((state:State) => state.aws);
    
    const {
        data: allObjectsFromPrefix,
        isLoading: loadingAllObjectsFromPrefix,
        error: errorAllObjectsFromPrefix,
        resetError: resetErrorAllObjectsFromPrefix,
    } = useFetchObjects(awsState.absolutePath);
    
    return (
        <Fragment>
            {errorAllObjectsFromPrefix && 
                <BaseDialog onClose={resetErrorAllObjectsFromPrefix} title={errorAllObjectsFromPrefix} status='error' />
            }
            <div className={styles['current_directory_view']}>
                <div
                    className={cx(
                        "current_directory_view_grid",
                        {"current_directory_view_grid_no_data": !allObjectsFromPrefix || allObjectsFromPrefix.length === 0}
                    )}
                >
                    {loadingAllObjectsFromPrefix ? <span>loading...</span> :
                        <Fragment>
                            {allObjectsFromPrefix ?
                                <Fragment>
                                    {getCurrDirectoryView(allObjectsFromPrefix, awsState.absolutePath).map(item => {
                                        return (
                                            <CurrentDirectoryViewItem
                                                key={item}
                                                name={item}
                                                isFolder={!item.includes('.txt')}
                                            />
                                        )
                                    })}
                                </Fragment> :
                                <p>No files and folders</p>
                            }
                        </Fragment>
                    }
                </div>
            </div>
        </Fragment>
    )
}
export default CurrentDirectoryView;