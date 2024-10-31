import { useTranslation } from 'react-i18next'

import { useApplication } from '@/hooks/useApplication'

import { Section } from '@/components/Section'

import {
  ChangelogItem,
  InstallationDateItem,
  LastUpdateDateItem,
  LicensesItem,
  NameItem,
  VersionItem,
} from './components'

export function AboutSection() {
  const { t } = useTranslation('settings', { keyPrefix: 'about' })
  const { data: application } = useApplication()

  if (!application) {
    return null
  }

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>{t('title')}</Section.Title>
      </Section.Header>

      <Section.Content>
        <NameItem label={t('name')} name={application.name} />

        <Section.Divider />

        <VersionItem
          label={t('version')}
          version={application.version}
          buildNumber={application.buildNumber}
        />

        {!!application?.installDate && (
          <>
            <Section.Divider />

            <InstallationDateItem
              label={t('installation-date')}
              date={application.installDate}
            />
          </>
        )}

        {application?.lastUpdateDate && (
          <>
            <Section.Divider />

            <LastUpdateDateItem
              label={t('last-update-date')}
              date={application.lastUpdateDate}
            />
          </>
        )}

        <Section.Divider />

        <ChangelogItem label={t('changelog')} />

        <Section.Divider />

        <LicensesItem label={t('licenses')} />
      </Section.Content>
    </Section.Root>
  )
}
