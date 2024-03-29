import {
  Box,
  Drawer,
  ListItemText,
  List,
  Typography,
  Divider,
  Hidden,
  Tooltip,
  ListItemButton,
  useTheme,
  styled,
} from '@mui/material';
import { useDashboard } from '../../contexts/DashboardContext/DashboardContext';
import { useGoogle } from '../../contexts/GoogleContext/GoogleContext';
import { useMediaPlayer } from '../../contexts/MediaPlayerContext/MediaPlayerContext';

const Sidebar = () => {
  const theme = useTheme();
  const { openDrawer, setOpenDrawer } = useDashboard();
  const { currentBook, playingChapter } = useGoogle();
  const { playChapter } = useMediaPlayer();

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const generateListItemClassName = (chapter) => {
    if (playingChapter) {
      if (!playingChapter.data.id.localeCompare(chapter.id)) {
        return 'playingChapter';
      }
    }

    return null;
  };

  const renderChapters = () => {
    if (currentBook) {
      return currentBook.chapters.map((chapter, index) => {
        return (
          <Tooltip
            title={chapter.name}
            followCursor
            placement="right-end"
            enterDelay={1000}
            key={chapter.id}
          >
            <ListItemButton
              className={generateListItemClassName(chapter)}
              divider
              dense
              onClick={() => {
                playChapter(currentBook, { data: chapter, index });
              }}
            >
              <ListItemText
                primary={chapter.name}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItemButton>
          </Tooltip>
        );
      });
    }

    return null;
  };

  const drawerContent = (
    <StyledDrawerContent>
      <Typography noWrap variant="subtitle2" align="center">
        {currentBook ? currentBook.name : 'NO BOOK SELECTED'}
      </Typography>
      <Divider />
      <List>{renderChapters()}</List>
    </StyledDrawerContent>
  );

  return (
    <div>
      <Hidden mdDown>
        <StyledDrawer
          className="thing"
          variant="persistent"
          anchor="left"
          open
          PaperProps={{
            sx: { width: theme.drawer.width },
          }}
        >
          {drawerContent}
        </StyledDrawer>
      </Hidden>
      <Hidden mdUp>
        <StyledDrawer
          className="thing"
          anchor="left"
          open={openDrawer}
          ModalProps={{ onBackdropClick: handleDrawerClose }}
          PaperProps={{
            sx: { width: theme.drawer.width },
          }}
        >
          {drawerContent}
        </StyledDrawer>
      </Hidden>
    </div>
  );
};

export default Sidebar;

// Styled Components
const StyledDrawerContent = styled(Box)(({ theme }) => ({
  '.MuiTypography-subtitle2': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },

  '.playingChapter': {
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': { borderWidth: 0 },
  '*::-webkit-scrollbar': { width: theme.scrollbar.smallWidth },
}));
