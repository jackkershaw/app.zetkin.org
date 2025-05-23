import makeStyles from '@mui/styles/makeStyles';
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import { ReactEventHandler, SyntheticEvent, useState } from 'react';

import { useMessages } from 'core/i18n';
import ZUISection from 'zui/ZUISection';
import messageIds from '../l10n/messageIds';
import oldTheme from 'theme';

const useStyles = makeStyles(() => ({
  divider: {
    marginLeft: 72,
  },
  editButton: {
    '& span': {
      fontWeight: 'bold',
    },
    color: oldTheme.palette.primary.main,
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: oldTheme.spacing(1),
  },
}));

const PersonCard: React.FunctionComponent<{
  children: React.ReactNode;
  onClickEdit?: ReactEventHandler;
  title: string;
}> = ({ onClickEdit, title, children }) => {
  const [editable, setEditable] = useState<boolean>();
  const classes = useStyles();
  const messages = useMessages(messageIds);

  const onToggleEdit = (evt: SyntheticEvent) => {
    setEditable(!editable);
    if (onClickEdit) {
      onClickEdit(evt);
    }
  };

  return (
    <ZUISection title={title}>
      <Card>
        {children}
        {onClickEdit && (
          <List disablePadding>
            <ListItem onClick={onToggleEdit}>
              <ListItemButton disabled={!onClickEdit}>
                <ListItemIcon>
                  {editable ? (
                    <Close color="primary" />
                  ) : (
                    <Edit color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText
                  className={classes.editButton}
                  primary={
                    editable
                      ? messages.editButtonClose({ title })
                      : messages.editButton({ title })
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Card>
    </ZUISection>
  );
};

export default PersonCard;
