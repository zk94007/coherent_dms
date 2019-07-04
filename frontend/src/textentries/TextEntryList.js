import { withStyles } from '@material-ui/core/styles';
import React, { Children, Fragment, cloneElement } from 'react';
import {
    BooleanField,
    BulkDeleteButton,
    Datagrid,
    DateField,
    DeleteWithConfirmButton,
    EditButton,
    ShowButton,
    Filter,
    List,
    ReferenceField,
    Responsive,
    SearchInput,
    SimpleList,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import ResetViewsButton from './ResetViewsButton';

const TextEntryFilter = props => (
    <Filter {...props}>
        <SearchInput source="search" alwaysOn />
    </Filter>
);

const styles = theme => ({
});

const TextEntryListBulkActions = props => (
    <Fragment>
        <ResetViewsButton {...props} />
        { props.permissions === 'manager' && <BulkDeleteButton {...props} /> }
    </Fragment>
);

const TextEntryListActionToolbar = withStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
})(({ classes, children, ...props }) => (
    <div className={classes.toolbar}>
        {Children.map(children, button => button && cloneElement(button, props))}
    </div>
));

const textEntryRowStyle = (record, index) => ({
    backgroundColor: record.is_active ? 'lightblue' : 'lightgrey',
});

const TextEntryList = withStyles(styles)(({ permissions, classes, ...props }) => (
    <List
        {...props}
        bulkActionButtons={<TextEntryListBulkActions />}
        filters={<TextEntryFilter />}
        filter={{article_type: 'textentry'}}
        sort={{ field: 'name', order: 'ASC' }}
    >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    tertiaryText={record =>
                        new Date(record.created_at).toLocaleDateString()
                    }
                    linkType={'show'}
                />
            }
            medium={
                <Datagrid rowClick={'show'} rowStyle={textEntryRowStyle}>
                    <TextField source="name" cellClassName={classes.name} />
                    <ReferenceField source="category_id" reference="categories" linkType={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    <BooleanField source="is_active" />
                    <BooleanField source="is_homepage" />
                    <DateField source="updated_at" />
                    <ReferenceField source="created_by" reference="users" linkType={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    <TextEntryListActionToolbar>
                        <ShowButton />
                        { permissions === 'manager' && <EditButton/>}
                        { permissions === 'manager' && <DeleteWithConfirmButton/>}
                    </TextEntryListActionToolbar>
                </Datagrid>
            }
        />
    </List>
));

export default TextEntryList;
