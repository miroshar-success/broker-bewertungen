import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';

function NewsView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <>
        <Grid spacing={2} container>
          <Grid xs={12} item>
            <FieldSetViewItem
              label={i18n('entities.news.fields.metadata')}
            >
              <Grid spacing={2} container>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.news.fields.link',
                    )}
                    value={record.link}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.news.fields.title',
                    )}
                    value={record.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.news.fields.meta_keywords',
                    )}
                    value={record.meta_keywords}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.news.fields.meta_description',
                    )}
                    value={record.meta_description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.news.fields.created',
                    )}
                    value={moment(record.created).format(
                      DEFAULT_MOMENT_FORMAT,
                    )}
                  />
                </Grid>
              </Grid>
            </FieldSetViewItem>
          </Grid>
          <Grid xs={12} item>
            <FieldSetViewItem
              label={i18n('entities.news.fields.teaser')}
            >
              <Grid spacing={2} container>
                <Grid item xs={12}>
                  <LogoViewItem
                    label={i18n(
                      'entities.news.fields.teaser_upload',
                    )}
                    value={record.news_image}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.news.fields.teaser_link',
                    )}
                    value={
                      record.news_image
                        ? record.news_image[0]?.link
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.news.fields.teaser_title',
                    )}
                    value={
                      record.news_image
                        ? record.news_image[0]?.linkTitle
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <HtmlViewItem
                    label={i18n(
                      'entities.news.fields.teaser',
                    )}
                    value={record.teaser}
                  />
                </Grid>
              </Grid>
            </FieldSetViewItem>
          </Grid>
          <Grid xs={12} item>
            <FieldSetViewItem
              label={i18n(
                'entities.news.fields.page_content',
              )}
            >
              <Grid spacing={2} container>
                <Grid item xs={12}>
                  <TextViewItem
                    label={i18n(
                      'entities.news.fields.name',
                    )}
                    value={record.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <HtmlViewItem
                    label={i18n(
                      'entities.news.fields.body',
                    )}
                    value={record.body}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CheckboxViewItem
                    label={i18n(
                      'entities.news.fields.activated',
                    )}
                    checked={record.activated}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <CheckboxViewItem
                    label={i18n('entities.news.fields.pdf')}
                    checked={record.pdf}
                  />
                </Grid>
              </Grid>
            </FieldSetViewItem>
          </Grid>
        </Grid>
      </>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default NewsView;
