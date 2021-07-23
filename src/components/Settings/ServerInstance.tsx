import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import RadarrLogo from '../../assets/services/radarr.svg';
import SonarrLogo from '../../assets/services/sonarr.svg';
import globalMessages from '../../i18n/globalMessages';
import Badge from '../Common/Badge';

const messages = defineMessages({
  ssl: 'SSL',
  default: 'Default',
  default4k: 'Default 4K',
  is4k: '4K',
  address: 'Address',
  activeProfile: 'Active Profile',
});

interface ServerInstanceProps {
  name: string;
  isDefault?: boolean;
  is4k?: boolean;
  hostname: string;
  port: number;
  isSSL?: boolean;
  externalUrl?: string;
  profileName: string;
  isSonarr?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const ServerInstance: React.FC<ServerInstanceProps> = ({
  name,
  hostname,
  port,
  profileName,
  is4k = false,
  isDefault = false,
  isSSL = false,
  isSonarr = false,
  externalUrl,
  onEdit,
  onDelete,
}) => {
  const intl = useIntl();

  const internalUrl =
    (isSSL ? 'https://' : 'http://') + hostname + ':' + String(port);
  const serviceUrl = externalUrl ?? internalUrl;

  return (
    <li className="col-span-1 bg-gray-800 rounded-lg shadow ring-1 ring-gray-500">
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center mb-2 space-x-2">
            <h3 className="font-medium leading-5 text-white truncate">
              <a
                href={serviceUrl}
                className="transition duration-300 hover:underline hover:text-white"
              >
                {name}
              </a>
            </h3>
            {isDefault && !is4k && (
              <Badge>{intl.formatMessage(messages.default)}</Badge>
            )}
            {isDefault && is4k && (
              <Badge>{intl.formatMessage(messages.default4k)}</Badge>
            )}
            {!isDefault && is4k && (
              <Badge badgeType="warning">
                {intl.formatMessage(messages.is4k)}
              </Badge>
            )}
            {isSSL && (
              <Badge badgeType="success">
                {intl.formatMessage(messages.ssl)}
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm leading-5 text-gray-300 truncate">
            <span className="mr-2 font-bold">
              {intl.formatMessage(messages.address)}
            </span>
            <a
              href={internalUrl}
              className="transition duration-300 hover:underline hover:text-white"
            >
              {internalUrl}
            </a>
          </p>
          <p className="mt-1 text-sm leading-5 text-gray-300 truncate">
            <span className="mr-2 font-bold">
              {intl.formatMessage(messages.activeProfile)}
            </span>
            {profileName}
          </p>
        </div>
        <a href={serviceUrl} className="opacity-50 hover:opacity-100">
          {isSonarr ? (
            <SonarrLogo className="flex-shrink-0 w-10 h-10" />
          ) : (
            <RadarrLogo className="flex-shrink-0 w-10 h-10" />
          )}
        </a>
      </div>
      <div className="border-t border-gray-500">
        <div className="flex -mt-px">
          <div className="flex flex-1 w-0 border-r border-gray-500">
            <button
              onClick={() => onEdit()}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium leading-5 text-gray-200 transition duration-150 ease-in-out border border-transparent rounded-bl-lg hover:text-white focus:outline-none focus:ring-blue focus:border-gray-500 focus:z-10"
            >
              <PencilIcon className="w-5 h-5 mr-2" />
              <span>{intl.formatMessage(globalMessages.edit)}</span>
            </button>
          </div>
          <div className="flex flex-1 w-0 -ml-px">
            <button
              onClick={() => onDelete()}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium leading-5 text-gray-200 transition duration-150 ease-in-out border border-transparent rounded-br-lg hover:text-white focus:outline-none focus:ring-blue focus:border-gray-500 focus:z-10"
            >
              <TrashIcon className="w-5 h-5 mr-2" />
              <span>{intl.formatMessage(globalMessages.delete)}</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ServerInstance;
