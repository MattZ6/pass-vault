import { MMKV } from "react-native-mmkv";

type StoreInput<Payload = unknown> = {
	key: string;
	payload: Payload;
};

export class MMKVStorage {
	private storage: MMKV;

	constructor(
		private readonly id: string = "com.passvault.global",
		private readonly encryptionKey: string = "pass.vault.key#!",
	) {
		this.storage = new MMKV({ id: this.id, encryptionKey: this.encryptionKey });
	}

	retrieveKeys() {
		try {
			return this.storage.getAllKeys();
		} catch (_) {
			return [];
		}
	}

	store<Payload = unknown>(input: StoreInput<Payload>) {
		try {
			const { key, payload } = input;

			this.storage.set(key, JSON.stringify(payload));
		} catch (_) {
			// Do nothing
		}
	}

	retrieve<Payload>(key: string) {
		try {
			const storedData = this.storage.getString(key);

			if (!storedData) {
				return null;
			}

			const parsedData = JSON.parse(storedData);

			return parsedData as Payload;
		} catch (_) {
			// Do nothing

			return null;
		}
	}

	destroy(key: string) {
		try {
			this.storage.delete(key);
		} catch (_) {
			// Do nothing
		}
	}
}
