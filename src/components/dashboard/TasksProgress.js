import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import EmojiTransportation from '@material-ui/icons/EmojiTransportation';

const TasksProgress = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            AGENCES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            15
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          >
            <EmojiTransportation />
          </Avatar>
        </Grid>
      </Grid>
      
    </CardContent>
  </Card>
);

export default TasksProgress;
